from app import app
from flask import jsonify, request, render_template
from app.models import User, Lender, Borrower, Tool, ToolCategory, basic_auth, token_auth

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/token', methods=['POST'])
@basic_auth.login_required
def get_token():
    user = basic_auth.current_user()
    token = user.get_token()
    return jsonify({'token': token})

# create user - no login required
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    user_email = data['email']
    if User.query.filter_by(email=user_email).first() is not None:
        return jsonify({'error': f"User with email '{user_email}' already exists"}), 400
    new_user = User(**data)
    return jsonify(new_user.to_dict())

# Get user from token
@app.route('/user-info', methods=['GET'])
@token_auth.login_required
def user_info():
    data = token_auth.current_user().to_dict()
    return data

# get user from id
@app.route('/users/<int:user_id>')
@token_auth.login_required
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

# for later:
# modify user info (like change main email, update PW, change zip code, change exchange location)

# for later:
# delete user - no longer participating at all
# necessitates deleting record of lender (if exists)
#   which would also necessitate deleting lender's tools 
#       (see below for note on creating function to delete tools from lender)

# create lender
@app.route('/users/lenders', methods=['POST'])
@token_auth.login_required
def create_lender():
    data = request.json
    current_user = token_auth.current_user()
    data['user_id'] = current_user.id
    new_lender = Lender(**data)
    return jsonify(new_lender.to_dict())

# for later:
# add method to delete lender 
# also necessitates deleting all the tools belonging to the lender
#   (ie person no longer wants to lend, but wants to remain in system)
#   ---> Alternately: add ACTIVE column to lender/borrower tables <---
#   ---> this would temporarily disable lend/borrow <---
#   ---> instead of deleting tools, could just set them all'available = False'


# create borrower
@app.route('/users/borrowers', methods=['POST'])
@token_auth.login_required
def create_borrower():
    data = request.json
    current_user = token_auth.current_user()
    data['user_id'] = current_user.id
    new_borrower = Borrower(**data)
    return jsonify(new_borrower.to_dict())

# create a tool
@app.route('/tools', methods=['POST'])
@token_auth.login_required
def add_tool():
    data = request.json
    current_user = token_auth.current_user()
    data['lender_id'] = current_user.lender.id
    new_tool = Tool(**data)
    return jsonify(new_tool.to_dict())

# get all tools
@app.route('/tools')
def get_all_tools():
    tools = Tool.query.all()
    return jsonify({[t.to_dict() for t in tools]})

# get tools by owner
@app.route('/my-tools/lender/<int:my_id>')
@token_auth.login_required
def get_my_tools(my_id):
    tools = Tool.query.filter_by(lender_id=int(my_id)).all()
    my_tools = {}
    for t in tools:
        my_tools[t.tool_name] = t.to_dict()
    return jsonify(my_tools)

# get tool from id
@app.route('/tools/<int:tool_id>')
def get_a_tool(tool_id):
    tool = Tool.query.get_or_404(tool_id)
    return jsonify(tool.to_dict())

# get available tools
@app.route('/tools/available')
def get_available_tools():
    tools = Tool.query.filter(available=True).all()
    return jsonify({[t.to_dict() for t in tools]})

# modify specific tool from id
@app.route('/tools/<int:tool_id>', methods=['PUT'])
@token_auth.login_required
def modify_tool(tool_id):
    tool = Tool.query.get_or_404(tool_id)
    user = token_auth.current_user()
    if user.lender_id != tool.lender_id:
        return jsonify({'error':'You are not authorized to modify information about this tool.'}), 403
    data = request.json
    tool.update(data)

# Delete a tool from id
@app.route('/tools/<int:tool_id>', methods=['DELETE'])
@token_auth.login_required
def delete_tool(tool_id):
    tool = Tool.query.get_or_404(tool_id)
    user = token_auth.current_user()
    if user.lender_id != tool.lender_id:
        return jsonify({'error': 'You do not have permission to modify or delete this tool.'}), 403
    tool.delete()
    return jsonify({'success': f'{tool.tool_name} has been deleted'})

# get tool category info
@app.route('/tool-categories')
def get_tool_categories():
    tool_cat_objs = ToolCategory.query.all()
    tool_categories = {}
    for tc in tool_cat_objs:
        tool_categories[tc.cat_name] = tc.to_dict()
    return jsonify(tool_categories)

# get parent category info
@app.route('/head-categories')
def get_head_categories():
    tool_cat_heads = ToolCategory.query.filter_by(parent_id='NULL').all()
    head_categories = {}
    for hc in tool_cat_heads:
        head_categories[hc.cat_name] = hc.to_dict()
    return jsonify(head_categories)

# get child category list
@app.route('/childof-<int:parent_cat_id>')
def get_child_categories(parent_cat_id):
    tool_cat_children = ToolCategory.query.filter_by(parent_id=parent_cat_id).all()
    child_categories = {}
    for cc in tool_cat_children:
        child_categories[cc.cat_name] = cc.id
    return jsonify(child_categories)

# get category name from id
@app.route('/category-ids')
def get_cat_from_id():
    toolCats = ToolCategory.query.all()
    cat_ids = {}
    for c in toolCats:
        cat_ids['category'] = (c)
        cat_ids['id'] = (c.to_dict()['cat_id'])
    return jsonify(cat_ids)