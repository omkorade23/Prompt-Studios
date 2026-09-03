package com.promptstudio.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import java.time.ZonedDateTime;

@Data
@Builder
public class UserDto {
    @JsonProperty("_id")
    private String id;
    @JsonProperty("google_id")
    private String googleId;
    private String email;
    private String name;
    @JsonProperty("profile_picture")
    private String profilePicture;
    @JsonProperty("created_at")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE, dd MMM yyyy HH:mm:ss 'GMT'", timezone = "GMT", locale = "en_US")
    private ZonedDateTime createdAt;
    @JsonProperty("updated_at")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE, dd MMM yyyy HH:mm:ss 'GMT'", timezone = "GMT", locale = "en_US")
    private ZonedDateTime updatedAt;
    @JsonProperty("last_login")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE, dd MMM yyyy HH:mm:ss 'GMT'", timezone = "GMT", locale = "en_US")
    private ZonedDateTime lastLogin;
}
