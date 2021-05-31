"""Module to access data for Authentication and Accounts """

from flaskr.db import get_db

from werkzeug.security import generate_password_hash


def get_user_id(username):
    db = get_db()
    return db.execute("SELECT id FROM user WHERE username = ?", (username,)).fetchone()


def get_user(username):
    db = get_db()
    return db.execute(
        """
        SELECT id, 
            username,
            password,
            first_name, 
            last_name, 
            job_title,
            organization
        FROM user WHERE username = ?""",
        (username,),
    ).fetchone()


def create_user(user):
    db = get_db()
    db.execute(
        """
        INSERT INTO user (
            username,
            password,
            first_name,
            last_name,
            job_title,
            organization,
            address,
            phone_number,
            email_address
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            user["username"],
            generate_password_hash(user["password"]),
            user["first_name"],
            user["last_name"],
            user["job_title"],
            user["organization"],
            user["address"],
            user["phone_number"],
            user["email_address"],
        ),
    )
    db.commit()
    return True
