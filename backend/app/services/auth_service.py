from google.oauth2 import id_token
from google.auth.transport import requests
from app.config import Config
from app.utils.db import db
from app.models.user import User
from app.utils.errors import APIError
from datetime import datetime, timezone

class AuthService:
    @staticmethod
    def verify_google_token(token):
        if not Config.GOOGLE_CLIENT_ID:
            raise APIError("Server misconfiguration: GOOGLE_CLIENT_ID is missing.", status_code=500)
            
        try:
            idinfo = id_token.verify_oauth2_token(
                token, requests.Request(), Config.GOOGLE_CLIENT_ID)

            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise APIError('Wrong issuer.')

            return idinfo
        except ValueError:
            raise APIError("Invalid token.", status_code=401)
            
    @staticmethod
    def login_or_register(idinfo):
        google_id = idinfo.get('sub')
        email = idinfo.get('email')
        name = idinfo.get('name')
        profile_picture = idinfo.get('picture', '')
        
        user = User.query.filter_by(google_id=google_id).first()
        
        if user:
            # Update last login
            user.last_login = datetime.now(timezone.utc)
            db.session.commit()
            return user.to_dict()
        else:
            # Create new user
            new_user = User.create(google_id, email, name, profile_picture)
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict()
