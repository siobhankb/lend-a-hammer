# from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
# from datetime import datetime
# from app.models import User

# basic_auth = HTTPBasicAuth()
# token_auth = HTTPTokenAuth()


# @basic_auth.verify_password
# def verify(email, password):
#     user = User.query.filter_by(email=email).first()
#     if user and user.check_password(password):
#         return user


# @token_auth.verify_token
# def verify(token):
#     user = User.query.filter_by(token=token).first()
#     if user and user.token_expiration > datetime.utcnow():
#         return user
