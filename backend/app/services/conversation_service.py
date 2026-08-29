from app.utils.db import db
from app.models.conversation import Conversation
from app.models.message import Message
from app.utils.errors import APIError
from datetime import datetime, timezone

class ConversationService:
    @staticmethod
    def create_conversation(user_id, title="New Conversation"):
        conv = Conversation.create(user_id, title)
        db.session.add(conv)
        db.session.commit()
        return conv.to_dict()

    @staticmethod
    def get_user_conversations(user_id):
        convs = Conversation.query.filter_by(user_id=user_id).order_by(Conversation.updated_at.desc()).all()
        return [conv.to_dict() for conv in convs]

    @staticmethod
    def get_conversation(user_id, conversation_id):
        conv = Conversation.query.filter_by(id=conversation_id).first()
        if not conv:
            raise APIError("Conversation not found", status_code=404)
        if conv.user_id != user_id:
            raise APIError("Unauthorized conversation access", status_code=403)
        return conv

    @staticmethod
    def rename_conversation(user_id, conversation_id, new_title):
        conv = ConversationService.get_conversation(user_id, conversation_id)
        conv.title = new_title
        conv.updated_at = datetime.now(timezone.utc)
        db.session.commit()
        return conv.to_dict()

    @staticmethod
    def delete_conversation(user_id, conversation_id):
        conv = ConversationService.get_conversation(user_id, conversation_id)
        
        # Delete messages associated with the conversation
        Message.query.filter_by(conversation_id=conversation_id).delete()
        
        # Delete conversation
        db.session.delete(conv)
        db.session.commit()
        return True

    @staticmethod
    def add_message(user_id, conversation_id, role, content):
        conv = ConversationService.get_conversation(user_id, conversation_id)
        
        msg = Message.create(conversation_id, user_id, role, content)
        db.session.add(msg)
        
        conv.updated_at = datetime.now(timezone.utc)
        db.session.commit()
        return msg.to_dict()

    @staticmethod
    def get_messages(user_id, conversation_id):
        # Ensure ownership
        ConversationService.get_conversation(user_id, conversation_id)
        
        messages = Message.query.filter_by(conversation_id=conversation_id).order_by(Message.created_at.asc()).all()
        return [msg.to_dict() for msg in messages]
