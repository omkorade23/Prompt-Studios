import requests

def test_api():
    base_url = "http://localhost:5001/api"
    session = requests.Session()
    
    # 1. Login
    print("Logging in...")
    r = session.post(f"{base_url}/auth/test-login")
    r.raise_for_status()
    print("Login successful:", r.json())
    
    # 2. Create conversation
    print("Creating conversation...")
    r = session.post(f"{base_url}/conversations", json={"title": "Test Chat"})
    r.raise_for_status()
    conv = r.json()
    print("Created conversation raw:", conv)
    conv_id = conv.get('_id', None)
    
    # 3. Send message
    print("Sending message...")
    r = session.post(f"{base_url}/chat", json={"conversation_id": conv_id, "message": "Hello from automated test. Say something short."})
    try:
        r.raise_for_status()
        print("Chat response:", r.json())
    except requests.exceptions.HTTPError as e:
        print("Chat Error Response:", r.text)
        raise e
    
    # 4. Verify in DB via GET
    print("Verifying messages...")
    r = session.get(f"{base_url}/conversations/{conv_id}/messages")
    r.raise_for_status()
    msgs = r.json()
    print(f"Total messages in conversation: {len(msgs)}")
    for m in msgs:
        print(f"[{m['role']}] {m['content'][:50]}...")
        
    if len(msgs) >= 2:
        print("SUCCESS: Persistence verified.")
    else:
        print("FAILED: Messages not persisted properly.")

if __name__ == "__main__":
    test_api()
