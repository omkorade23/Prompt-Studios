package com.promptstudio;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.promptstudio.model.User;
import com.promptstudio.repository.UserRepository;
import com.promptstudio.service.GeminiService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties = "spring.config.name=application-test")
@AutoConfigureMockMvc
public class PromptStudioApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private GeminiService geminiService;

    private User testUser;
    private MockHttpSession session;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        testUser = new User();
        testUser.setGoogleId("google123");
        testUser.setEmail("test@test.com");
        testUser.setName("Test User");
        userRepository.save(testUser);

        session = new MockHttpSession();
        session.setAttribute("user_id", testUser.getId());
    }

    @Test
    void testHealthCheck() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"));
    }

    @Test
    void testCreateConversation() throws Exception {
        Map<String, String> payload = new HashMap<>();
        payload.put("title", "My Conv");

        mockMvc.perform(post("/api/conversations")
                        .session(session)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("My Conv"))
                .andExpect(jsonPath("$.user_id").value(testUser.getId()));
    }

    @Test
    void testChat() throws Exception {
        when(geminiService.generateChatResponse(anyList())).thenReturn("This is a mocked Gemini response");

        // Create conversation
        Map<String, String> convPayload = new HashMap<>();
        convPayload.put("title", "Test chat");
        String convRes = mockMvc.perform(post("/api/conversations")
                        .session(session)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(convPayload)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        
        String convId = objectMapper.readTree(convRes).get("_id").asText();

        // Chat
        Map<String, String> chatPayload = new HashMap<>();
        chatPayload.put("conversation_id", convId);
        chatPayload.put("message", "Hello Gemini");

        mockMvc.perform(post("/api/chat")
                        .session(session)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(chatPayload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("assistant"))
                .andExpect(jsonPath("$.content").value("This is a mocked Gemini response"));
    }
}
