package com.promptstudio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.promptstudio.dto.MessageDto;
import com.promptstudio.exception.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    private final String apiKey;
    private final RestTemplate restTemplate;

    public GeminiService(@Value("${gemini.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.restTemplate = new RestTemplate();
    }

    public String generateChatResponse(List<MessageDto> history) {
        if (apiKey == null || apiKey.isEmpty()) {
            throw new ApiException("GEMINI_API_KEY not configured", 500);
        }

        if (history == null || history.isEmpty()) {
            throw new ApiException("No conversation history provided", 400);
        }

        MessageDto lastMessage = history.get(history.size() - 1);
        if (!"user".equals(lastMessage.getRole())) {
            throw new ApiException("Last message must be from user", 400);
        }

        List<Map<String, Object>> contents = new ArrayList<>();
        for (MessageDto msg : history) {
            String role = "user".equals(msg.getRole()) ? "user" : "model";
            Map<String, Object> part = new HashMap<>();
            part.put("text", msg.getContent());
            Map<String, Object> contentMap = new HashMap<>();
            contentMap.put("role", role);
            contentMap.put("parts", List.of(part));
            contents.add(contentMap);
        }

        Map<String, Object> requestBody = new HashMap<>();
        
        Map<String, Object> systemInstruction = new HashMap<>();
        systemInstruction.put("parts", List.of(Map.of("text", 
            "You are Prompt Studio, an AI assistant. Keep normal chat behavior unchanged. " +
            "However, if the user asks to 'review the prompt' (or similar) and no prompt/file has been uploaded or explicitly pasted for review, " +
            "you must ask the user to upload or paste the prompt first. " +
            "Do NOT treat an earlier generic chat message (such as greetings or test messages) as the prompt to review. " +
            "Only perform a prompt review when a prompt has been explicitly provided/uploaded in the current request/context."
        )));
        requestBody.put("systemInstruction", systemInstruction);
        
        requestBody.put("contents", contents);

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<JsonNode> response = restTemplate.postForEntity(url, entity, JsonNode.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode candidates = response.getBody().path("candidates");
                if (candidates.isArray() && candidates.size() > 0) {
                    JsonNode parts = candidates.get(0).path("content").path("parts");
                    if (parts.isArray() && parts.size() > 0) {
                        return parts.get(0).path("text").asText();
                    }
                }
            }
            throw new ApiException("Failed to parse Gemini response", 502);
        } catch (Exception e) {
            throw new ApiException("Gemini API Error: " + e.getMessage(), 502);
        }
    }
}
