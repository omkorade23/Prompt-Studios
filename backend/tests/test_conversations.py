def test_create_conversation(auth_client, mock_db):
    res = auth_client.post('/api/conversations', json={"title": "My Conv"})
    assert res.status_code == 201
    assert res.json['title'] == "My Conv"
    assert res.json['user_id'] == "user123"

def test_get_conversations(auth_client, mock_db):
    auth_client.post('/api/conversations', json={"title": "Conv 1"})
    auth_client.post('/api/conversations', json={"title": "Conv 2"})
    
    res = auth_client.get('/api/conversations')
    assert res.status_code == 200
    assert len(res.json) == 2

def test_unauthorized_conversation_access(auth_client, auth_client2, mock_db):
    # user1 creates conversation
    res1 = auth_client.post('/api/conversations', json={"title": "User 1 Secret Conv"})
    conv_id = res1.json['_id']
    
    # user2 tries to get it
    res2 = auth_client2.get(f'/api/conversations/{conv_id}')
    assert res2.status_code == 403
    assert "Unauthorized conversation access" in res2.json['error']
    
    # user2 tries to rename it
    res3 = auth_client2.patch(f'/api/conversations/{conv_id}', json={"title": "Hacked"})
    assert res3.status_code == 403
    
    # user2 tries to delete it
    res4 = auth_client2.delete(f'/api/conversations/{conv_id}')
    assert res4.status_code == 403
