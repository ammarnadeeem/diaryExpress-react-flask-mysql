from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from datetime import datetime
import datetime as DT
import json

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'samosa123'
app.config['MYSQL_DB'] = 'scrum'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

# Customer Register API
@app.route('/Customer/Register', methods=['POST'])
def customer_register():
    cur = mysql.connection.cursor()
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()
	
    try:
        cur.execute("INSERT INTO users (first_name, last_name, email, password, created) VALUES ('" + 
            str(first_name) + "', '" + 
            str(last_name) + "', '" + 
            str(email) + "', '" + 
            str(password) + "', '" + 
            str(created) + "')")
        mysql.connection.commit()
        return 'Success'
    except Exception as e:
        return 'Failed'
	
# Customer Login API
@app.route('/Customer/Login', methods=['POST'])
def customer_login():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
	
    try:
        cur.execute("SELECT * FROM users where email = '" + str(email) + "'")
        rv = cur.fetchone()
        if bcrypt.check_password_hash(rv['password'], password):
            access_token = create_access_token(identity = {'first_name': rv['first_name'],'last_name': rv['last_name'],'email': rv['email']})
            return access_token
        else:
            return 'Failed'
    except Exception as e:
        return 'Failed'

# Admin Register API
@app.route('/Admin/Register', methods=['POST'])
def admin_register():
    cur = mysql.connection.cursor()
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()
	
    try:
        cur.execute("INSERT INTO admins (first_name, last_name, email, password, created) VALUES ('" + 
            str(first_name) + "', '" + 
            str(last_name) + "', '" + 
            str(email) + "', '" + 
            str(password) + "', '" + 
            str(created) + "')")
        mysql.connection.commit()
        return 'Success'
    except Exception as e:
        return 'Failed'

# Admin Login API
@app.route('/Admin/Login', methods=['POST'])
def admin_login():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
	
    try:
        cur.execute("SELECT * FROM admins where email = '" + str(email) + "'")
        rv = cur.fetchone()
        
        if bcrypt.check_password_hash(rv['password'], password):
            access_token = create_access_token(identity = {'first_name': rv['first_name'],'last_name': rv['last_name'],'email': rv['email']})
            return access_token
        else:
            return 'Failed'
    
    except Exception as e:
        return 'Failed'

# Admin Deactivate API
@app.route('/Admin/AdminDeactivate', methods=['POST'])
def admin_deactivate():
    print(request)
    cur = mysql.connection.cursor()
    email = request.get_json()['email']

    try:
        cur.execute("SELECT * FROM admins where email = '" + str(email) + "'")
        rv = cur.fetchone()
        
        if rv is not None:
            cur.execute("DELETE FROM admins where email = '" + str(email) + "'")
            mysql.connection.commit()
            row_count = cur.rowcount
        
        if row_count > 0:
            access_token = create_access_token(identity = {'email': rv['email']})
            return access_token
        else:
            return 'Failed'
    
    except Exception as e:
        return 'Failed'

# Update Customization Parameters API
@app.route('/CustomizationParameters/Update', methods=['POST'])
def update_customization_parameters():
    cur = mysql.connection.cursor()
    paper_color1_availability = request.get_json()['paper_color1_availability']
    paper_color1_text = request.get_json()['paper_color1_text']
    paper_color2_availability = request.get_json()['paper_color2_availability']
    paper_color2_text = request.get_json()['paper_color2_text']
    paper_color3_availability = request.get_json()['paper_color3_availability']
    paper_color3_text = request.get_json()['paper_color3_text']

    paper_type1_availability = request.get_json()['paper_type1_availability']
    paper_type1_text = request.get_json()['paper_type1_text']
    paper_type2_availability = request.get_json()['paper_type2_availability']
    paper_type2_text = request.get_json()['paper_type2_text']
    paper_type3_availability = request.get_json()['paper_type3_availability']
    paper_type3_text = request.get_json()['paper_type3_text']

    cover_color1_availability = request.get_json()['cover_color1_availability']
    cover_color1_text = request.get_json()['cover_color1_text']
    cover_color2_availability = request.get_json()['cover_color2_availability']
    cover_color2_text = request.get_json()['cover_color2_text']
    cover_color3_availability = request.get_json()['cover_color3_availability']
    cover_color3_text = request.get_json()['cover_color3_text']

    cover_text = request.get_json()['cover_text']

    try:
        # Query to update color 1 in database
        query = "UPDATE PaperColorConfiguration SET "
        query += "IsAvailable = '" + str(paper_color1_availability) + "', "
        query += "Parameter = '" + str(paper_color1_text) + "' "
        query += "WHERE Parameter LIKE '" + str(paper_color1_text) + "'"
        cur.execute(query)

        # Query to update color 2 in database
        query = "UPDATE PaperColorConfiguration SET "
        query += "IsAvailable = '" + str(paper_color2_availability) + "', "
        query += "Parameter = '" + str(paper_color2_text) + "' "
        query += "WHERE Parameter LIKE '" + str(paper_color2_text) + "'"
        cur.execute(query)

        # Query to update color 3 in database
        query = "UPDATE PaperColorConfiguration SET "
        query += "IsAvailable = '" + str(paper_color3_availability) + "', "
        query += "Parameter = '" + str(paper_color3_text) + "' "
        query += "WHERE Parameter LIKE '" + str(paper_color3_text) + "'"
        cur.execute(query)

        # Query to update type 1 in database
        query = "UPDATE PaperTypeConfiguration SET "
        query += "IsAvailable = '" + str(paper_type1_availability) + "', "
        query += "Parameter = '" + str(paper_type1_text) + "' "
        query += "WHERE Parameter LIKE '" + str(paper_type1_text) + "'"
        cur.execute(query)

        # Query to update type 2 in database
        query = "UPDATE PaperTypeConfiguration SET "
        query += "IsAvailable = '" + str(paper_type2_availability) + "', "
        query += "Parameter = '" + str(paper_type2_text) + "' "
        query += "WHERE Parameter LIKE '" + str(paper_type2_text) + "'"
        cur.execute(query)

        # Query to update type 3 in database
        query = "UPDATE PaperTypeConfiguration SET "
        query += "IsAvailable = '" + str(paper_type3_availability) + "', "
        query += "Parameter = '" + str(paper_type3_text) + "' "
        query += "WHERE Parameter LIKE '" + str(paper_type3_text) + "'"
        cur.execute(query)

        # Query to update cover color 1 in database
        query = "UPDATE CoverColorConfiguration SET "
        query += "IsAvailable = '" + str(cover_color1_availability) + "', "
        query += "Parameter = '" + str(cover_color1_text) + "' "
        query += "WHERE Parameter LIKE '" + str(cover_color1_text) + "'"
        cur.execute(query)

        # Query to update cover color 2 in database
        query = "UPDATE CoverColorConfiguration SET "
        query += "IsAvailable = '" + str(cover_color2_availability) + "', "
        query += "Parameter = '" + str(cover_color2_text) + "' "
        query += "WHERE Parameter LIKE '" + str(cover_color2_text) + "'"
        cur.execute(query)

        # Query to update cover color 3 in database
        query = "UPDATE CoverColorConfiguration SET "
        query += "IsAvailable = '" + str(cover_color3_availability) + "', "
        query += "Parameter = '" + str(cover_color3_text) + "' "
        query += "WHERE Parameter LIKE '" + str(cover_color3_text) + "'"
        cur.execute(query)

        # Query to update cover color 3 in database
        query = "UPDATE CoverTextConfiguration SET "
        query += "IsAvailable = '" + str(cover_text) + "' "
        query += "WHERE Parameter LIKE 'Text'"
        cur.execute(query)

        mysql.connection.commit()
        return "Success"

    except Exception as e:
        return 'Failed'

# Get Customization Parameters API
@app.route('/CustomizationParameters/Get', methods=['POST'])
def get_customization_parameters():
    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT * FROM PaperColorConfiguration WHERE id = 1 ")
        rv = cur.fetchone()
        paper_color1_availability = rv['IsAvailable']
        
        cur.execute("SELECT * FROM PaperColorConfiguration WHERE id = 2 ")
        rv = cur.fetchone()
        paper_color2_availability = rv['IsAvailable']

        cur.execute("SELECT * FROM PaperColorConfiguration WHERE id = 3 ")
        rv = cur.fetchone()
        paper_color3_availability = rv['IsAvailable']

        cur.execute("SELECT * FROM PaperTypeConfiguration WHERE id = 1 ")
        rv = cur.fetchone()
        paper_type1_availability = rv['IsAvailable']
        
        cur.execute("SELECT * FROM PaperTypeConfiguration WHERE id = 2 ")
        rv = cur.fetchone()
        paper_type2_availability = rv['IsAvailable']

        cur.execute("SELECT * FROM PaperTypeConfiguration WHERE id = 3 ")
        rv = cur.fetchone()
        paper_type3_availability = rv['IsAvailable']

        cur.execute("SELECT * FROM CoverColorConfiguration WHERE id = 1 ")
        rv = cur.fetchone()
        paper_color1_availability = rv['IsAvailable']
        
        cur.execute("SELECT * FROM CoverColorConfiguration WHERE id = 2 ")
        rv = cur.fetchone()
        paper_color2_availability = rv['IsAvailable']

        cur.execute("SELECT * FROM CoverColorConfiguration WHERE id = 3 ")
        rv = cur.fetchone()
        paper_color3_availability = rv['IsAvailable']

        cur.execute("SELECT * FROM CoverTextConfiguration WHERE id = 1 ")
        rv = cur.fetchone()
        cover_text_availability = rv['IsAvailable']

        result = {
        'paper_color1_availability': paper_color1_availability,
        'paper_color2_availability': paper_color2_availability,
        'paper_color3_availability': paper_color3_availability,
        'paper_type1_availability': paper_type1_availability,
        'paper_type2_availability': paper_type2_availability,
        'paper_type3_availability': paper_type3_availability,
        'cover_color1_availability': paper_color1_availability,
        'cover_color2_availability': paper_color2_availability,
        'cover_color3_availability': paper_color3_availability,
        'cover_text_availability' : cover_text_availability
        }
    
        return result

    except Exception as e:
        return 'Failed'

# Get All Customers API
@app.route('/Admin/AllCustomers', methods=['POST'])
def get_all_customers():
    cur = mysql.connection.cursor()

    try:
        cur.execute("SELECT first_name, last_name, email FROM users")
        rv = cur.fetchall()
        return json.dumps(rv)
    except Exception as e:
        return 'Failed'

# Get All Orders of a Customer API
@app.route('/Admin/GetCustomerOrders', methods=['POST'])
def get_customer_orders():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']

    try:
        cur.execute("SELECT o.Id, o.PaperColor, o.PaperType, o.CoverColor, o.CoverText, o.OrderDate, o.DeliveryOption, o.Comments, u.first_name, u.last_name, u.email FROM CustomerOrder o INNER JOIN Users u on o.customerEmail = u.Email WHERE u.email LIKE '" + str(email) + "'")
        rv = cur.fetchall()
        return json.dumps(rv)
    except Exception as e:
        return 'Failed'

# Get All Customer Orders in a month or week API
@app.route('/Admin/GetAllCustomerOrders', methods=['POST'])
def get_all_customer_orders():
    cur = mysql.connection.cursor()
    reportType = request.get_json()['reportType']

    if reportType == 'Monthly':
        days = 30
    else:
        days = 7

    today = DT.date.today()
    search_days = today - DT.timedelta(days=days)

    try:
        cur.execute("SELECT o.Id, o.PaperColor, o.PaperType, o.CoverColor, o.CoverText, o.OrderDate, o.DeliveryOption, o.Comments, u.first_name, u.last_name, u.email FROM CustomerOrder o INNER JOIN Users u on o.customerEmail = u.Email WHERE o.OrderDateTime > '" + str(search_days) + "'")
        rv = cur.fetchall()
        return json.dumps(rv)
    except Exception as e:
        return 'Failed'

# Delete Customer API
@app.route('/Admin/DeleteCustomer', methods=['POST'])
def delete_customer():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']

    try:
        cur.execute("SELECT * FROM users where email = '" + str(email) + "'")
        rv = cur.fetchone()
        
        if rv is not None:
            cur.execute("DELETE FROM users where email = '" + str(email) + "'")
            mysql.connection.commit()
            row_count = cur.rowcount
        
        if row_count > 0:
            return "Success"
        else:
            return "Failed"
    
    except Exception as e:
        return 'Failed'

# Remove Customer Order Comments API
@app.route('/Admin/RemoveCustomerOrderComment', methods=['POST'])
def remove_customer_order_comment():
    cur = mysql.connection.cursor()
    orderid = request.get_json()['id']
    email = request.get_json()['email']

    try:
        cur.execute("UPDATE CustomerOrder SET Comments = '' WHERE CustomerEmail = '" + str(email) + "' AND Id = '" + str(orderid) + "'")
        rv = cur.fetchall()
        mysql.connection.commit()
        return json.dumps(rv)
    except Exception as e:
        return 'Failed'

# Get Customization Parameters API
@app.route('/Admin/PlaceCustomerOrder', methods=['POST'])
def place_customer_order():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    coverText = request.get_json()['coverText']
    paperColor = request.get_json()['paperColor']
    paperType = request.get_json()['paperType']
    coverColor = request.get_json()['coverColor']
    deliveryOption = request.get_json()['deliveryOption']
    comments = request.get_json()['comments']
    orderDate = str(datetime.today().strftime('%m/%d/%Y'))
    orderDateTime = datetime.today()

    try:
        cur.execute("SELECT MAX(id) from CustomerOrder")
        rv = cur.fetchone()

        if cur.rowcount == 0:
            orderId = 1
        else:
            orderId = rv['MAX(id)'] + 1

        cur.execute("INSERT INTO CustomerOrder VALUES ('" + 
            str(orderId) + "', '" + 
            str(email) + "', '" + 
            str(paperColor) + "', '" + 
            str(paperType) + "', '" + 
            str(coverColor) + "', '" +
            str(coverText) + "', '" +
            str(orderDate) + "', '" +
            str(deliveryOption) + "', '" +
            str(comments) + "', '" +
            str(orderDateTime) + "')")
        mysql.connection.commit()
        return 'Success'

    except Exception as e:
        return 'Failed'
	
if __name__ == '__main__':
    app.run(debug=True)