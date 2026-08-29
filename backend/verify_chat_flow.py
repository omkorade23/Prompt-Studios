import os
import uuid
from app import create_app
from app.utils.db import db
from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message
from app.services.conversation_service import ConversationService

def verify_chat():
    app = create_app()
    app.config['TESTING'] = True
    
    with app.app_context():
        # Setup Test User and Conversation in DB
        test_user_id = str(uuid.uuid4())
        test_user = User(
            id=test_user_id,
            google_id=f"test_{test_user_id}",
            email="testchat@neon.db",
            name="Neon Chat Tester"
        )
        db.session.add(test_user)
        db.session.commit()
        
        conv_id = None
        try:
            # Create conversation via service
            conv = ConversationService.create_conversation(test_user_id, "Test Conversation")
            conv_id = conv['id']
            
            # Use test_client to hit the route
            with app.test_client() as client:
                with client.session_transaction() as sess:
                    sess['user_id'] = test_user_id
                    
                response = client.post('/api/chat', json={
                    'conversation_id': conv_id,
                    'message': 'Hello Gemini! Reply with Exactly: "PONG_CHAT"'
                })
                
                print(f"Chat API Response Status: {response.status_code}")
                if response.status_code == 200:
                    data = response.get_json()
                    print(f"Chat API Response Data: {data}")
                    
                    # Verify Persistence in Neon DB
                    messages = Message.query.filter_by(conversation_id=conv_id).order_by(Message.created_at.asc()).all()
                    print(f"Total messages in Neon for conversation: {len(messages)}")
                    for idx, msg in enumerate(messages):
                        print(f"[{idx}] Role: {msg.role}, Content: {msg.content}")
                    
                    if len(messages) == 2 and messages[0].role == 'user' and messages[1].role == 'assistant':
                        print("PASS: Chat flow and Neon persistence verified successfully.")
                    else:
                        print("FAIL: Messages not persisted properly.")
                else:
                    print(f"FAIL: Chat API failed with {response.get_data(as_text=True)}")
                    
        finally:
            # Clean up
            if conv_id:
                Message.query.filter_by(conversation_id=conv_id).delete()
                Conversation.query.filter_by(id=conv_id).delete()
            db.session.delete(test_user)
            db.session.commit()
            print("Cleanup successful.")

if __name__ == "__main__":
    verify_chat()
