from flask_sqlalchemy import SQLAlchemy
from app.config import Config

db = SQLAlchemy()

def init_db(app=None):
    if app is not None:
        db.init_app(app)
        
        # In a real production scenario with multiple servers, you might want to use a tool like 
        # Flask-Migrate or Alembic instead of create_all. But for Phase 1/college project, this is acceptable.
        if Config.SQLALCHEMY_DATABASE_URI:
            with app.app_context():
                try:
                    db.create_all()
                    print(f"Successfully connected to database and initialized schema.")
                except Exception as e:
                    print(f"Could not connect to database or initialize schema: {e}")
        else:
            print("SQLALCHEMY_DATABASE_URI not found in environment variables. Running without Database.")

def get_db():
    return db

