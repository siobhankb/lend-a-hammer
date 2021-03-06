import os
basedir = os.path.abspath(os.path.dirname(__file__))
# from secrets import key
# key in gitignore

class Config:
    SECRET_KEY = os.environ.get(
        'SECRET_KEY') or 'XjjXybqjCUVwV6Ll_IjaHqcn7T8b4vdy'
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    DEBUG = True # Turns on debugging features in Flask
    SQLALCHEMY_TRACK_MODIFICATIONS = False