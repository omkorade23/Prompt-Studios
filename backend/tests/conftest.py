import pytest
from app import create_app
from app.config import Config
from flask import session
from app.utils.db import db
from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message
import uuid

class TestConfig(Config):
    TESTING = True
    SECRET_KEY = "test_secret"
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    GEMINI_API_KEY = "test_key"
    GOOGLE_CLIENT_ID = "test_client_id"

@pytest.fixture
def app():
    app = create_app(TestConfig)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture(autouse=True)
def mock_db(app):
    with app.app_context():
        db.create_all()
        yield db
        db.session.remove()
        db.drop_all()

@pytest.fixture
def auth_client(app, mock_db):
    with app.app_context():
        user = User(
            id="user123",
            google_id="google123",
            email="test@test.com",
            name="Test User",
            profile_picture=""
        )
        db.session.add(user)
        db.session.commit()
    
    client = app.test_client()
    with client.session_transaction() as sess:
        sess['user_id'] = "user123"
        
    return client
    
@pytest.fixture
def auth_client2(app, mock_db):
    with app.app_context():
        user = User(
            id="user456",
            google_id="google456",
            email="test2@test.com",
            name="Test User 2",
            profile_picture=""
        )
        db.session.add(user)
        db.session.commit()
    
    client = app.test_client()
    with client.session_transaction() as sess:
        sess['user_id'] = "user456"
        
    return client
