import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'XjjXybqjCUVwV6Ll_IjaHqcn7T8b4vdy'
    SQLALCHEMY_DATABASE_URI = "postgres://nlpwnone:XjjXybqjCUVwV6Ll_IjaHqcn7T8b4vdy@heffalump.db.elephantsql.com/nlpwnone"
    DEBUG = True # Turns on debugging features in Flask
    SQLALCHEMY_TRACK_MODIFICATIONS = False