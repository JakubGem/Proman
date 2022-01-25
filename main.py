from flask import Flask, render_template, url_for, session, request, redirect
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash

from util import json_response
import mimetypes
from query import users_queries, board_queries, status_queries, card_queries, columns_queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()
app.secret_key = 'proman'


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """

    return board_queries.get_boards()


@app.route("/api/columns/<int:board_id>")
@json_response
def get_columns_for_board(board_id: int):
    return columns_queries.get_columns(board_id)


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return card_queries.get_cards_for_board(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        name = request.form['name']
        password = request.form['password']
        my_user = users_queries.get_one_user(name)
        if my_user and check_password_hash(my_user['password'], password):
            session['login'] = True
            session['user'] = my_user['name']
            session['user_id'] = my_user['id']
            return redirect('/')
        else:
            return render_template('login.html', message="Incorrect user name or password")
    return render_template('login.html')


@app.route('/logout')
def logout():
    if session['login'] == True:
        session.pop('login')
        session.pop('user')
        session.pop('user_id')
    return render_template('login.html', message="You are logged out")


@app.route('/register', methods=['POST', 'GET'])
def register():
    if 'login' in session:
        return redirect('/')
    elif request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        if users_queries.get_one_user(name):
            return render_template('register.html', message="Username already exists, please choose another one!")

        user_data = {'name': name,
                     'email': email,
                     'password': generate_password_hash(request.form['password'])}
        users_queries.create_new_user(user_data)
        return render_template('login.html', message="Successful registration. Log in to continue.")
    return render_template('register.html')


@app.route("/api/boards/<int:board_id>/cards/add", methods=['POST'])
@json_response
def create_new_card(board_id: int):
    """
    Create new card for user and board.
    """
    card_data = {
        'board_id': board_id,
        'status_id': 1,
        'user_id': session['user_id'],
        'title': request.get_json()['title'],
        'card_order': 0
    }
    card_id = card_queries.create_new_card(card_data)
    card_data['card_id'] = card_id['id']
    return card_data


if __name__ == '__main__':
    main()
