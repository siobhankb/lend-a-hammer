from app import app
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    _id = db.Column(db.Integer, primary_key=true)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.Integer(5), nullable=False)
    # <-- this is how to set up a foreign key!!
    lender = db.relationship('Lender', backref='user')
    borrower = db.relationship('Borrower', backref='user')
    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.password = generate_password_hash(kwargs['password'])
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<User | {self.email}"

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

    def to_dict(self):
        data = {
            'id': self.id,
            'email': self.email,
            'joined': self.date_created,
            'lender': self.lender,
            'borrower': self.borrower
        }
        return data

class Lender(db.Model):
    lender_id = db.Column(db.Integer, primary_key=true)
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    lender_rating = db.Column(db.Numeric(2,1))
    # <-- this is how to set up a foreign key!!
    user_id = db.Column(db.Integer, ForeignKey('user._id'))


class Borrower(db.Model):
    borrower_id = db.Column(db.Integer, primary_key=true)
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    borrower_rating = db.Column(db.Numeric(2, 1))
    # <-- this is how to set up a foreign key!!
    user_id = db.Column(db.Integer, ForeignKey('user._id'))

class Tool(db.Model):
    tool_id = db.Column(db.Integer, primary_key=true)
    tool_name = db.Column(db.String(50), nullable=False)
    tool_cat = db.Column(db.Integer, nullable=False)

    # check out "adjacency list model"
    # https://www.mysqltutorial.org/mysql-adjacency-list-tree/
