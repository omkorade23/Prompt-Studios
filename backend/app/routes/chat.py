from flask import Blueprint, request, jsonify
from app.services.conversation_service import ConversationService
from app.services.gemini_service import GeminiService
from app.utils.errors import APIError
from app.routes.auth import get_current_user

chat_bp = Blueprint('chat', __name__)

def require_auth():
    user_id = get_current_user()
    if not user_id:
        raise APIError("Unauthorized", status_code=401)
    return user_id

@chat_bp.route('/conversations/<conversation_id>/messages', methods=['GET'])
def get_messages(conversation_id):
    user_id = require_auth()
    messages = ConversationService.get_messages(user_id, conversation_id)
    return jsonify(messages)

@chat_bp.route('/chat', methods=['POST'])
def send_message():
    user_id = require_auth()
    data = request.get_json()
    
    if not data:
        raise APIError("Missing JSON body", status_code=400)
        
    conversation_id = data.get('conversation_id')
    message_content = data.get('message')
    
    if not conversation_id or not message_content:
        raise APIError("Missing conversation_id or message", status_code=400)
        
    if not str(message_content).strip():
        raise APIError("Empty message", status_code=400)
        
    # Save user message
    ConversationService.add_message(user_id, conversation_id, "user", message_content)
    
    # Retrieve history
    history = ConversationService.get_messages(user_id, conversation_id)
    
    # Generate Gemini Response
    response_text = GeminiService.generate_chat_response(history)
    
    # Save assistant message
    ai_msg = ConversationService.add_message(user_id, conversation_id, "assistant", response_text)
    
    return jsonify(ai_msg)
