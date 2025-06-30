import logging

from fastapi import APIRouter, HTTPException, Depends
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_400_BAD_REQUEST

from dal.userRepository import UserRepository
from dto.userDto import LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ErrorResponse
from dto.userDto import MessageResponse
from services.userService import UserService

router = APIRouter()


def get_user_service() -> UserService:
    return UserService(UserRepository())


@router.post("/login", response_model=LoginResponse, responses={401: {"models": ErrorResponse}})
async def login(login_request: LoginRequest, user_service: UserService = Depends(get_user_service)):
    user = user_service.login_user(login_request.email, login_request.password)
    if user:
        return LoginResponse(message="Login successful", user_id=str(user.id))
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/register", response_model=RegisterResponse, responses={400: {"models": ErrorResponse}})
async def register(register_request: RegisterRequest, user_service: UserService = Depends(get_user_service)):
    logging.info(f"Received registration request for email: {register_request.email}")
    try:
        registration_result = user_service.register_user(
            register_request.email,
            register_request.password,
            register_request.confirm_password
        )

        if "error" in registration_result:
            logging.error(f"Registration error for email: {register_request.email}: {registration_result['error']}")
            raise HTTPException(
                status_code=HTTP_400_BAD_REQUEST,
                detail=registration_result["error"]
            )

        logging.info(f"User registered successfully: {register_request.email}")
        return RegisterResponse(
            message="Registration successful",
            user_id=registration_result["user_id"]
        )

    except Exception as e:
        logging.exception(f"Registration failed for email: {register_request.email}, error: {e}")
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Registration failed"
        )


