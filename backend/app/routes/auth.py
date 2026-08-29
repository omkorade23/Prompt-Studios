from flask import Blueprint, request, jsonify, session
from app.services.auth_service import AuthService
from app.utils.errors import APIError

auth_bp = Blueprint('auth', __name__)

def get_current_user():
    return session.get('user_id')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    token = data.get('id_token')
    
    if not token:
        raise APIError("Missing id_token", status_code=400)
        
    idinfo = AuthService.verify_google_token(token)
    user = AuthService.login_or_register(idinfo)
    
    session['user_id'] = user['_id']
    
    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user['_id'],
            "name": user['name'],
            "email": user['email'],
            "profile_picture": user['profile_picture']
        }
    })

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logout successful"})

@auth_bp.route('/me', methods=['GET'])
def get_me():
    user_id = get_current_user()
    if not user_id:
        raise APIError("Unauthorized", status_code=401)
    
    from app.models.user import User
    user = User.query.get(user_id)
    if not user:
        raise APIError("User not found", status_code=404)
        
    return jsonify({
        "id": user['_id'],
        "name": user['name'],
        "email": user['email'],
        "profile_picture": user['profile_picture']
    })
