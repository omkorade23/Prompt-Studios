from flask import Blueprint, request, jsonify, session
from app.services.conversation_service import ConversationService
from app.utils.errors import APIError
from app.routes.auth import get_current_user

conversations_bp = Blueprint('conversations', __name__)

def require_auth():
    user_id = get_current_user()
    if not user_id:
        raise APIError("Unauthorized", status_code=401)
    return user_id

@conversations_bp.route('', methods=['POST'])
def create_conversation():
    user_id = require_auth()
    data = request.get_json() or {}
    title = data.get('title', 'New Conversation')
    
    conv = ConversationService.create_conversation(user_id, title)
    return jsonify(conv), 201

@conversations_bp.route('', methods=['GET'])
def get_conversations():
    user_id = require_auth()
    convs = ConversationService.get_user_conversations(user_id)
    return jsonify(convs)

@conversations_bp.route('/<conversation_id>', methods=['GET'])
def get_conversation(conversation_id):
    user_id = require_auth()
    conv = ConversationService.get_conversation(user_id, conversation_id)
    return jsonify(conv.to_dict())

@conversations_bp.route('/<conversation_id>', methods=['PATCH'])
def rename_conversation(conversation_id):
    user_id = require_auth()
    data = request.get_json()
    if not data or 'title' not in data:
        raise APIError("Title is required", status_code=400)
        
    conv = ConversationService.rename_conversation(user_id, conversation_id, data['title'])
    return jsonify(conv)

@conversations_bp.route('/<conversation_id>', methods=['DELETE'])
def delete_conversation(conversation_id):
    user_id = require_auth()
    ConversationService.delete_conversation(user_id, conversation_id)
    return jsonify({"message": "Conversation deleted successfully"})
