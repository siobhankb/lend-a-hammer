from app import app, db
from app.models import User, Lender, Borrower, Tool, ToolCategory

if __name__ == '__main__':
    app.run()

# this just sets up the variables for models and db so that when
# you're in flask-shell, you don't have to import them over and over
@app.shell_context_processor
def make_context():
   return {'db':db, 'User': User, 'Lender': Lender, 'Borrower': Borrower, 'Tool': Tool, 'ToolCategory': ToolCategory}

@app.before_first_request
def create_tables():
    db.create_all()