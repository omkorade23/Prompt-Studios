from datetime import datetime, timezone
import uuid
from app.utils.db import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    google_id = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    last_login = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    @staticmethod
    def create(google_id, email, name, profile_picture=""):
        return User(
            google_id=google_id,
            email=email,
            name=name,
            profile_picture=profile_picture
        )

    def to_dict(self):
        return {
            "_id": self.id,
            "google_id": self.google_id,
            "email": self.email,
            "name": self.name,
            "profile_picture": self.profile_picture,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "last_login": self.last_login
        }
