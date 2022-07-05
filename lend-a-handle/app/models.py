import os
from datetime import datetime, timedelta
import base64
from app import db
from flask_login import UserMixin
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from werkzeug.security import generate_password_hash, check_password_hash

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.Numeric(5, 0), nullable=False)
    # <-- this is how to set up a foreign key!!
    lender = db.relationship('Lender', backref='lender')
    borrower = db.relationship(
        'Borrower', backref='borrower')
    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.password = generate_password_hash(kwargs['password'])
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<User | {self.email}"

    def to_dict(self):
        data = {
            'id': self.id,
            'joined': self.date_created,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'zip_code': self.zip_code,
            'lender': self.lender.to_dict(),
            'borrower': self.borrower.to_dict()
        }
        return data

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # authorization for API
    def get_token(self, expires_in=3600):
        now=datetime.utcnow()
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.commit()
        return self.token

    def revoke_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)
        db.session.commit()

    # def get_roles(self):
    #     roles=[]
    #     if self.lender.id != null:
    #         roles.append('lender')
    #     if self.borrower.id != null:
    #         roles.append('borrower')
    #     if self.id == 1:
    #         roles.append('admin')
    #     return roles


    def update(self, data):
        for info in data:
            if info in {'email', 'password','first_name', 'last_name'}:
                if info == 'password':
                    setattr(self, info, generate_password_hash(data[info]))
                else:
                    setattr(self, info, data[info])
            else:
                return
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


@basic_auth.verify_password
def verify(email, password):
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return user


@token_auth.verify_token
def verify(token):
    user = User.query.filter_by(token=token).first()
    if user and user.token_expiration > datetime.utcnow():
        return user
# @basic_auth.get_user_roles
# def get_user_roles(user):
#     return user.get_roles()


class Lender(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)

    exchange_location = db.Column(db.String(200), nullable=False)
    lender_rating = db.Column(db.Numeric(2,1), default=0)
    # <-- this is how to set up a foreign key!!
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    tools = db.relationship('Tool', backref='owner')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        data = {
            'id': self.id,
            'date_created': self.date_created,
            'lender_rating': self.lender_rating,
            'user_id': self.user_id
        }
        return data

class Borrower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    borrower_rating = db.Column(db.Numeric(2, 1), default=0)
    # <-- this is how to set up a foreign key!!
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    loans = db.relationship('loanTool', backref='loan_records')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        data = {
            'borrower_id': self.id,
            'date_created': self.date_created,
            'borrower_rating': self.borrower_rating,
            'user_id': self.user_id
        }
        return data

class Tool(db.Model):
    __tablename__ = 'tool'
    id = db.Column(db.Integer, primary_key=True)
    lender_id = db.Column(db.Integer, db.ForeignKey('lender.id'), nullable=False)
    tool_name = db.Column(db.String(50), nullable=False)
    tool_descr = db.Column(db.String(200), nullable=False)
    category = db.Column(db.Integer, nullable=False)
    available = db.Column(db.Boolean, nullable=False)
    loans = db.relationship('loanTool', backref='loans')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def set_available(self, bool):
        setattr(self, self.available, bool)
        db.session.commit()

    def to_dict(self):
        data = {
            'tool_id': self.id,
            'lender_id': self.owner_id,
            'tool_name': self.tool_name,
            'tool_descr': self.tool_descr,
            'tool_cat': self.tool_cat,
            'available': self.available
        }
        return data

    def modify(self, data):
        for info in data:
            setattr(self, info, data[info])
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    # check out "adjacency list model"
    # https://www.mysqltutorial.org/mysql-adjacency-list-tree/


class ToolCategory(db.Model):
    __tablename__= 'tool_category'
    id = db.Column(db.Integer, primary_key=True)
    cat_name = db.Column(db.String(50), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey(
        'tool_category.id'), index=True, nullable=True)
    sub_cat = db.relationship('ToolCategory', backref=db.backref(
        'parent', remote_side='ToolCategory.id'))
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        data = {
            'cat_id': self.id,
            'category': self.cat_name,
            'parent_cat': self.parent_id,
            'sub_cat': self.sub_cat
        }
        return data

    def modify(self, data):
        for info in data:
            setattr(self, info, data[info])
        db.session.commit()

class loanTool(db.Model):
    __tablename__ = 'tool_loans'
    loan_id = db.Column(db.Integer, primary_key=True)
    tool_id = db.Column(db.Integer, db.ForeignKey('tool.id'), nullable=False)
    borrower_id = db.Column(db.Integer, db.ForeignKey('borrower.id'), nullable=False)
    date_out = db.Column(db.DateTime, nullable=False)
    date_due = db.Column(db.DateTime, nullable=False)
    date_returned = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        data = {
            'loan_id': self.loan_id,
            'tool_id': self.tool_id,
            'borrower_id': self.borrower_id,
            'date_out': self.date_out,
            'date_due': self.date_due,
            'date_returned': self.date_returned
        }
        return data

    def modify(self, data):
        for info in data:
            setattr(self, info, data[info])
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

# @basic_auth.login_required(role=['admin', 'borrower'])
# class lenderNote(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     submitted_by = db.Column(db.String(8))
#     note = db.Column(db.String(300))

#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)
#         db.session.add(self)
#         db.session.commit()

#     def to_dict(self):
#         data = {
#             'cat_id': self.id,
#             'category': self.cat_name,
#             'parent_cat': self.parent_id,
#             'sub_cat': self.sub_cat
#         }
#         return data

# @basic_auth.login_required(role=['admin', 'lender'])
# class borrowerNote(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     note = db.Column(db.String(300))


# @basic_auth.login_required
# class toolNote(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     note = db.Column(db.String(300)) 
