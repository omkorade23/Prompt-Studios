package com.promptstudio.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.promptstudio.dto.DtoMapper;
import com.promptstudio.dto.UserDto;
import com.promptstudio.exception.ApiException;
import com.promptstudio.model.User;
import com.promptstudio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.ZonedDateTime;
import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final GoogleIdTokenVerifier verifier;

    public AuthService(UserRepository userRepository, @Value("${google.client.id}") String clientId) {
        this.userRepository = userRepository;
        this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public GoogleIdToken.Payload verifyGoogleToken(String tokenString) {
        try {
            GoogleIdToken idToken = verifier.verify(tokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String issuer = payload.getIssuer();
                if (!"accounts.google.com".equals(issuer) && !"https://accounts.google.com".equals(issuer)) {
                    throw new ApiException("Wrong issuer.");
                }
                return payload;
            } else {
                throw new ApiException("Invalid ID token.", 401);
            }
        } catch (Exception e) {
            throw new ApiException("Invalid token: " + e.getMessage(), 401);
        }
    }

    @Transactional
    public UserDto loginOrRegister(GoogleIdToken.Payload payload) {
        String googleId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String profilePicture = (String) payload.get("picture");
        if (profilePicture == null) profilePicture = "";

        User user = userRepository.findByGoogleId(googleId).orElse(null);

        if (user != null) {
            user.setLastLogin(ZonedDateTime.now());
            user = userRepository.save(user);
        } else {
            user = new User();
            user.setGoogleId(googleId);
            user.setEmail(email);
            user.setName(name);
            user.setProfilePicture(profilePicture);
            user = userRepository.save(user);
        }

        return DtoMapper.toDto(user);
    }
}
