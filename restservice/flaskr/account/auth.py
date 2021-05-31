import functools

from flask import (
    Blueprint,
    flash,
    g,
    jsonify,
    redirect,
    render_template,
    request,
    session,
    url_for,
)
from werkzeug.security import check_password_hash


from flaskr.account.auth_data import get_user_id, create_user, get_user

bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    user = {
        "username": data["username"],
        "password": data["password"],
        "first_name": data["firstName"],
        "last_name": data["lastName"],
        "job_title": data["jobTitle"],
        "organization": data["organization"],
        "address": data["address"],
        "phone_number": data["phoneNumber"],
        "email_address": data["emailAddress"],
    }
    error = None

    if not user["username"]:
        error = "Username is required."
    elif not user["password"]:
        error = "Password is required."
    elif not user["first_name"]:
        error = "First name is required."
    elif not user["last_name"]:
        error = "Last name is required."
    elif not user["job_title"]:
        error = "Job title is required."
    elif not user["organization"]:
        error = "Organization is required."
    elif not user["address"]:
        error = "Address is required."
    elif not user["phone_number"]:
        error = "Phone number is required."
    elif not user["email_address"]:
        error = "Email address is required."
    elif get_user_id(user["username"]) is not None:
        error = f"User {user['username']} is already registered."

    if error is None:
        print(
            f"Registration successful for {user['username']}, moniker: {user['first_name']} {user['last_name']}"
        )
        user_created = create_user(user)
        if user_created is not None:
            return jsonify({"success": True}), 201

    print(error)
    flash(error)


@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    error = None
    user_db = get_user(username)

    if user_db is None:
        error = "Incorrect username."
    elif not check_password_hash(user_db["password"], password):
        error = "Incorrect password."

    if error is None:
        user = {
            "id": user_db["id"],
            "username": user_db["username"],
            "firstName": user_db["first_name"],
            "lastName": user_db["last_name"],
            "jobTitle": user_db["job_title"],
            "organization": user_db["organization"],
        }
        print(
            f'login successful for {username}, id: {user["id"]}, moniker: {user["firstName"]} {user["lastName"]}'
        )
        session.clear()
        session["user_id"] = user["id"]
        return jsonify(user)

    print(error)
    flash(error)
