const API_BASE_URL = 'http://localhost:5001/api';

// State
let currentUser = null;
let conversations = [];
let activeConversationId = null;
let selectedFile = null;

// DOM Elements
const devLoginOverlay = document.getElementById('dev-login-overlay');
const devLoginBtn = document.getElementById('dev-login-btn');
const newChatBtn = document.getElementById('new-chat-btn');
const conversationsList = document.getElementById('conversations-list');
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const currentChatTitle = document.getElementById('current-chat-title');
const userProfile = document.getElementById('user-profile');
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const uploadPreview = document.getElementById('upload-preview');
const uploadFilename = document.getElementById('upload-filename');
const removeUploadBtn = document.getElementById('remove-upload-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
});

// Event Listeners
devLoginBtn.addEventListener('click', handleDevLogin);
newChatBtn.addEventListener('click', handleNewChat);
sendBtn.addEventListener('click', handleSendMessage);
messageInput.addEventListener('input', () => {
    sendBtn.disabled = messageInput.value.trim() === '' && !selectedFile;
    // Auto-resize textarea
    messageInput.style.height = 'auto';
    messageInput.style.height = (messageInput.scrollHeight) + 'px';
});
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// Upload UI Logic
uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        uploadFilename.textContent = selectedFile.name;
        uploadPreview.style.display = 'flex';
        sendBtn.disabled = false;
    }
});
removeUploadBtn.addEventListener('click', () => {
    selectedFile = null;
    fileInput.value = '';
    uploadPreview.style.display = 'none';
    sendBtn.disabled = messageInput.value.trim() === '';
});

// API Functions
async function fetchApi(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    // Merge options
    const finalOptions = { ...defaultOptions, ...options };
    if (options.headers) {
        finalOptions.headers = { ...defaultOptions.headers, ...options.headers };
    }

    const response = await fetch(url, finalOptions);
    if (!response.ok) {
        if (response.status === 401) {
            showLoginOverlay();
            throw new Error("Unauthorized");
        }
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'API request failed');
    }
    return response.json();
}

async function checkSession() {
    try {
        const user = await fetchApi('/auth/me');
        currentUser = user;
        hideLoginOverlay();
        renderUserProfile();
        await loadConversations();
    } catch (e) {
        showLoginOverlay();
    }
}

async function handleDevLogin() {
    devLoginBtn.disabled = true;
    devLoginBtn.innerHTML = '<span class="loader"></span>';
    try {
        const res = await fetchApi('/auth/test-login', { method: 'POST' });
        currentUser = res.user;
        hideLoginOverlay();
        renderUserProfile();
        await loadConversations();
    } catch (e) {
        console.error("Login failed", e);
        alert("Login failed. Is the backend running with 'dev' profile?");
    } finally {
        devLoginBtn.disabled = false;
        devLoginBtn.textContent = 'Login as Test User';
    }
}

async function loadConversations() {
    try {
        conversations = await fetchApi('/conversations');
        renderConversations();
        if (conversations.length > 0 && !activeConversationId) {
            await selectConversation(conversations[0]._id);
        }
    } catch (e) {
        console.error("Failed to load conversations", e);
    }
}

async function handleNewChat() {
    try {
        const newConv = await fetchApi('/conversations', {
            method: 'POST',
            body: JSON.stringify({ title: 'New Conversation' })
        });
        conversations.unshift(newConv);
        await selectConversation(newConv._id);
        renderConversations();
    } catch (e) {
        console.error("Failed to create chat", e);
    }
}

async function selectConversation(id) {
    activeConversationId = id;
    renderConversations();
    const conv = conversations.find(c => c._id === id);
    currentChatTitle.textContent = conv ? conv.title : 'Chat';
    
    messagesContainer.innerHTML = '<div class="loader-container" style="text-align:center; padding: 40px;"><span class="loader" style="border-top-color: var(--accent-color)"></span></div>';
    
    try {
        const messages = await fetchApi(`/conversations/${id}/messages`);
        renderMessages(messages);
    } catch (e) {
        console.error("Failed to load messages", e);
        messagesContainer.innerHTML = '<div class="error-msg" style="text-align:center; padding: 20px; color: var(--danger-color);">Failed to load messages</div>';
    }
}

async function handleSendMessage() {
    const text = messageInput.value.trim();
    if (!text && !selectedFile) return;

    // Isolate file upload UI - the backend doesn't support this yet
    if (selectedFile) {
        console.log(`[Frontend Isolation] File selected for upload: ${selectedFile.name}`);
        // In the future, this would use FormData to upload to a specific endpoint
        // e.g. await fetchApi('/prompt/review', { method: 'POST', body: formData })
        
        // For now, we clear the UI state and just append a note to the text
        selectedFile = null;
        fileInput.value = '';
        uploadPreview.style.display = 'none';
    }

    if (!text) return; // If it was just a file, stop here since we don't have the API

    if (!activeConversationId) {
        await handleNewChat();
    }

    const payload = {
        conversation_id: activeConversationId,
        message: text
    };

    messageInput.value = '';
    messageInput.style.height = 'auto';
    sendBtn.disabled = true;

    // Optimistic UI
    appendMessage({ role: 'user', content: text });
    
    // Add loading indicator
    const loaderId = 'loader-' + Date.now();
    appendLoading(loaderId);

    try {
        const responseMsg = await fetchApi('/chat', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        document.getElementById(loaderId)?.remove();
        appendMessage(responseMsg);
        
        // Reload conversations to update title if it changed (some AIs auto-rename)
        loadConversations();
    } catch (e) {
        document.getElementById(loaderId)?.remove();
        appendMessage({ role: 'system', content: `Error: ${e.message}` });
        console.error("Failed to send message", e);
    }
}

async function deleteConversation(id, e) {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this conversation?")) return;
    
    try {
        await fetchApi(`/conversations/${id}`, { method: 'DELETE' });
        conversations = conversations.filter(c => c._id !== id);
        if (activeConversationId === id) {
            activeConversationId = null;
            messagesContainer.innerHTML = '';
            currentChatTitle.textContent = 'Select a conversation';
            if (conversations.length > 0) {
                await selectConversation(conversations[0]._id);
            }
        }
        renderConversations();
    } catch (err) {
        console.error("Failed to delete", err);
        alert("Failed to delete conversation");
    }
}

async function renameConversation(id, e) {
    e.stopPropagation();
    const newTitle = prompt("Enter new title:");
    if (!newTitle || newTitle.trim() === '') return;
    
    try {
        await fetchApi(`/conversations/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ title: newTitle })
        });
        const conv = conversations.find(c => c._id === id);
        if (conv) conv.title = newTitle;
        if (activeConversationId === id) currentChatTitle.textContent = newTitle;
        renderConversations();
    } catch (err) {
        console.error("Failed to rename", err);
        alert("Failed to rename conversation");
    }
}

// Rendering Functions
function renderConversations() {
    conversationsList.innerHTML = '';
    conversations.forEach(conv => {
        const el = document.createElement('div');
        el.className = `conversation-item ${activeConversationId === conv._id ? 'active' : ''}`;
        
        const titleEl = document.createElement('div');
        titleEl.className = 'conversation-title';
        titleEl.textContent = conv.title || 'New Conversation';
        
        const actionsEl = document.createElement('div');
        actionsEl.className = 'conversation-actions';
        
        const renameBtn = document.createElement('button');
        renameBtn.className = 'action-btn';
        renameBtn.innerHTML = '✎';
        renameBtn.title = "Rename";
        renameBtn.onclick = (e) => renameConversation(conv._id, e);
        
        const delBtn = document.createElement('button');
        delBtn.className = 'action-btn delete';
        delBtn.innerHTML = '🗑';
        delBtn.title = "Delete";
        delBtn.onclick = (e) => deleteConversation(conv._id, e);
        
        actionsEl.appendChild(renameBtn);
        actionsEl.appendChild(delBtn);
        
        el.appendChild(titleEl);
        el.appendChild(actionsEl);
        
        el.onclick = () => selectConversation(conv._id);
        conversationsList.appendChild(el);
    });
}

function renderMessages(messages) {
    messagesContainer.innerHTML = '';
    if (messages.length === 0) {
        messagesContainer.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-secondary);">No messages yet. Send a prompt to start!</div>';
        return;
    }
    messages.forEach(msg => appendMessage(msg, false));
    scrollToBottom();
}

function appendMessage(msg, scroll = true) {
    const isUser = msg.role === 'user';
    const isSystem = msg.role === 'system';
    
    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${msg.role}`;
    if (isSystem) wrapper.style.backgroundColor = 'var(--danger-color)';
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? 'U' : (isSystem ? '!' : 'PS');
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = msg.content;
    
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(content);
    wrapper.appendChild(msgDiv);
    
    messagesContainer.appendChild(wrapper);
    if (scroll) scrollToBottom();
}

function appendLoading(id) {
    const wrapper = document.createElement('div');
    wrapper.id = id;
    wrapper.className = `message-wrapper ai`;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'PS';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = '<span class="loader" style="border-width: 2px; width: 14px; height: 14px;"></span>';
    
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(content);
    wrapper.appendChild(msgDiv);
    
    messagesContainer.appendChild(wrapper);
    scrollToBottom();
}

function renderUserProfile() {
    if (!currentUser) return;
    userProfile.innerHTML = `
        <img src="${currentUser.profile_picture || 'https://ui-avatars.com/api/?name=User'}" alt="User">
        <span class="user-profile-name">${currentUser.name}</span>
    `;
}

function showLoginOverlay() {
    devLoginOverlay.style.display = 'flex';
}

function hideLoginOverlay() {
    devLoginOverlay.style.display = 'none';
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
