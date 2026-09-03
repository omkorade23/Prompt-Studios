package com.promptstudio.controller;

import com.promptstudio.dto.ConversationDto;
import com.promptstudio.exception.ApiException;
import com.promptstudio.service.ConversationService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    private String requireAuth(HttpSession session) {
        String userId = (String) session.getAttribute("user_id");
        if (userId == null) {
            throw new ApiException("Unauthorized", 401);
        }
        return userId;
    }

    @PostMapping
    public ResponseEntity<ConversationDto> createConversation(@RequestBody(required = false) Map<String, String> payload, HttpSession session) {
        String userId = requireAuth(session);
        String title = payload != null ? payload.get("title") : "New Conversation";
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(conversationService.createConversation(userId, title));
    }

    @GetMapping
    public ResponseEntity<List<ConversationDto>> getConversations(HttpSession session) {
        String userId = requireAuth(session);
        return ResponseEntity.ok(conversationService.getUserConversations(userId));
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<ConversationDto> getConversation(@PathVariable String conversationId, HttpSession session) {
        String userId = requireAuth(session);
        return ResponseEntity.ok(conversationService.getConversation(userId, conversationId));
    }

    @PatchMapping("/{conversationId}")
    public ResponseEntity<ConversationDto> renameConversation(@PathVariable String conversationId, @RequestBody Map<String, String> payload, HttpSession session) {
        String userId = requireAuth(session);
        if (payload == null || !payload.containsKey("title")) {
            throw new ApiException("Title is required", 400);
        }
        return ResponseEntity.ok(conversationService.renameConversation(userId, conversationId, payload.get("title")));
    }

    @DeleteMapping("/{conversationId}")
    public ResponseEntity<Map<String, String>> deleteConversation(@PathVariable String conversationId, HttpSession session) {
        String userId = requireAuth(session);
        conversationService.deleteConversation(userId, conversationId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Conversation deleted successfully");
        return ResponseEntity.ok(response);
    }
}
