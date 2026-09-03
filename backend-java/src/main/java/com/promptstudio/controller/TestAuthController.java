package com.promptstudio.controller;

import com.promptstudio.dto.DtoMapper;
import com.promptstudio.dto.UserDto;
import com.promptstudio.model.User;
import com.promptstudio.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@Profile("dev")
public class TestAuthController {

    private final UserRepository userRepository;

    public TestAuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/test-login")
    public ResponseEntity<Map<String, Object>> testLogin(HttpSession session) {
        String testEmail = "testuser@example.com";
        Optional<User> optionalUser = userRepository.findByGoogleId("test-google-id");
        
        User user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            user.setLastLogin(ZonedDateTime.now());
            user = userRepository.save(user);
        } else {
            user = new User();
            user.setGoogleId("test-google-id");
            user.setEmail(testEmail);
            user.setName("Test User");
            user.setProfilePicture("https://ui-avatars.com/api/?name=Test+User&background=random");
            user = userRepository.save(user);
        }

        session.setAttribute("user_id", user.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Dev Login successful");
        
        UserDto userDto = DtoMapper.toDto(user);
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", userDto.getId());
        userMap.put("name", userDto.getName());
        userMap.put("email", userDto.getEmail());
        userMap.put("profile_picture", userDto.getProfilePicture());
        response.put("user", userMap);

        return ResponseEntity.ok(response);
    }
}
