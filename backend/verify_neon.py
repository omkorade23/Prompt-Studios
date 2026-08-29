import os
import uuid
from app import create_app
from app.utils.db import db
from app.models.user import User
from app.models.conversation import Conversation

def verify():
    app = create_app()
    with app.app_context():
        print("Testing DB connection...")
        
        # Test write
        test_user_id = str(uuid.uuid4())
        new_user = User(
            id=test_user_id,
            google_id=f"test_{test_user_id}",
            email="test@neon.db",
            name="Neon Tester"
        )
        db.session.add(new_user)
        db.session.commit()
        print(f"User {new_user.id} inserted successfully!")
        
        # Test read
        retrieved_user = db.session.get(User, test_user_id)
        if retrieved_user:
            print(f"User {retrieved_user.name} retrieved successfully!")
        else:
            print("Failed to retrieve user!")
            
        # Clean up
        db.session.delete(retrieved_user)
        db.session.commit()
        print("Cleanup successful.")
        
if __name__ == "__main__":
    verify()
