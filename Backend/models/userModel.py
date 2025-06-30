from mongoengine import DateTimeField, EmailField
from mongoengine import Document, StringField


class User(Document):
    email = EmailField(required=True, unique=True)
    password_hash = StringField(required=True)


