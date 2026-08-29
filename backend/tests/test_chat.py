import pytest

@pytest.fixture(autouse=True)
def mock_gemini(monkeypatch):
    def mock_generate_chat_response(history):
        return "This is a mocked Gemini response"
    monkeypatch.setattr('app.services.gemini_service.GeminiService.generate_chat_response', mock_generate_chat_response)

def test_send_message_missing_data(auth_client):
    res = auth_client.post('/api/chat', json={"message": "hello"})
    assert res.status_code == 400

def test_send_message_success(auth_client, mock_db):
    # Create conversation first
    res = auth_client.post('/api/conversations', json={"title": "Test chat"})
    conv_id = res.json['_id']
    
    res = auth_client.post('/api/chat', json={
        "conversation_id": conv_id,
        "message": "Hello Gemini"
    })
    
    assert res.status_code == 200
    assert res.json['role'] == 'assistant'
    assert res.json['content'] == "This is a mocked Gemini response"
    
    # Verify messages are saved
    from app.models.message import Message
    from app.utils.db import db
    msgs = Message.query.filter_by(conversation_id=conv_id).order_by(Message.created_at.asc()).all()
    assert len(msgs) == 2
    assert msgs[0].role == 'user'
    assert msgs[1].role == 'assistant'
    
def test_chat_unauthorized_access(auth_client, auth_client2, mock_db):
    # user1 creates conversation
    res1 = auth_client.post('/api/conversations', json={"title": "User 1 Secret Conv"})
    conv_id = res1.json['_id']
    
    # user2 tries to chat in user1's conversation
    res2 = auth_client2.post('/api/chat', json={
        "conversation_id": conv_id,
        "message": "Hello"
    })
    
    assert res2.status_code == 403
