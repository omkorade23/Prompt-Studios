package com.promptstudio.controller;

import com.promptstudio.dto.MessageDto;
import com.promptstudio.exception.ApiException;
import com.promptstudio.service.ConversationService;
import com.promptstudio.service.GeminiService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final ConversationService conversationService;
    private final GeminiService geminiService;

    public ChatController(ConversationService conversationService, GeminiService geminiService) {
        this.conversationService = conversationService;
        this.geminiService = geminiService;
    }

    private String requireAuth(HttpSession session) {
        String userId = (String) session.getAttribute("user_id");
        if (userId == null) {
            throw new ApiException("Unauthorized", 401);
        }
        return userId;
    }

    @GetMapping("/conversations/{conversationId}/messages")
    public ResponseEntity<List<MessageDto>> getMessages(@PathVariable String conversationId, HttpSession session) {
        String userId = requireAuth(session);
        return ResponseEntity.ok(conversationService.getMessages(userId, conversationId));
    }

    @PostMapping("/chat")
    public ResponseEntity<MessageDto> sendMessage(@RequestBody Map<String, String> payload, HttpSession session) {
        String userId = requireAuth(session);
        
        if (payload == null) {
            throw new ApiException("Missing JSON body", 400);
        }
        
        String conversationId = payload.get("conversation_id");
        String messageContent = payload.get("message");
        
        if (conversationId == null || messageContent == null) {
            throw new ApiException("Missing conversation_id or message", 400);
        }
        
        if (messageContent.trim().isEmpty()) {
            throw new ApiException("Empty message", 400);
        }
        
        // Save user message
        conversationService.addMessage(userId, conversationId, "user", messageContent);
        
        // Retrieve history
        List<MessageDto> history = conversationService.getMessages(userId, conversationId);
        
        // Generate Gemini Response
        String responseText = geminiService.generateChatResponse(history);
        
        // Save assistant message
        MessageDto aiMsg = conversationService.addMessage(userId, conversationId, "assistant", responseText);
        
        return ResponseEntity.ok(aiMsg);
    }
}
