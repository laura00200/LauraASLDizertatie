import logging

from models.userModel import User


class UserRepository:
    def find_by_email(self, email: str):
        logging.info(f"Querying user by email: {email}")
        return User.objects(email=email).first()

