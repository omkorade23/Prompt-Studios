package com.promptstudio.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import java.time.ZonedDateTime;

@Data
@Builder
public class ConversationDto {
    @JsonProperty("_id")
    private String id;
    @JsonProperty("user_id")
    private String userId;
    private String title;
    @JsonProperty("created_at")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE, dd MMM yyyy HH:mm:ss 'GMT'", timezone = "GMT", locale = "en_US")
    private ZonedDateTime createdAt;
    @JsonProperty("updated_at")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEE, dd MMM yyyy HH:mm:ss 'GMT'", timezone = "GMT", locale = "en_US")
    private ZonedDateTime updatedAt;
}
