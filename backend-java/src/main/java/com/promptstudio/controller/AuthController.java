package com.promptstudio.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.promptstudio.dto.UserDto;
import com.promptstudio.exception.ApiException;
import com.promptstudio.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload, HttpSession session) {
        String token = payload.get("id_token");
        if (token == null || token.isEmpty()) {
            throw new ApiException("Missing id_token", 400);
        }

        GoogleIdToken.Payload googlePayload = authService.verifyGoogleToken(token);
        UserDto user = authService.loginOrRegister(googlePayload);

        session.setAttribute("user_id", user.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", user.getId());
        userMap.put("name", user.getName());
        userMap.put("email", user.getEmail());
        userMap.put("profile_picture", user.getProfilePicture());
        response.put("user", userMap);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        session.invalidate();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getMe(HttpSession session, com.promptstudio.repository.UserRepository userRepository) {
        String userId = (String) session.getAttribute("user_id");
        if (userId == null) {
            throw new ApiException("Unauthorized", 401);
        }
        
        com.promptstudio.model.User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("User not found", 404));
                
        return ResponseEntity.ok(com.promptstudio.dto.DtoMapper.toDto(user));
    }
}
