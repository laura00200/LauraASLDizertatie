from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str


class RegisterResponse(BaseModel):
    message: str
    user_id: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    message: str
    user_id: str


class MessageResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    error: str
