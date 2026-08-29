from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.utils.errors import APIError, handle_api_error

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, supports_credentials=True)

    # Initialize Database
    from app.utils.db import init_db
    init_db(app)

    # Register Error Handler
    app.register_error_handler(APIError, handle_api_error)

    # Register Blueprints (to be added)
    from app.routes.health import health_bp
    from app.routes.auth import auth_bp
    from app.routes.conversations import conversations_bp
    from app.routes.chat import chat_bp

    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(conversations_bp, url_prefix="/api/conversations")
    app.register_blueprint(chat_bp, url_prefix="/api")

    return app
