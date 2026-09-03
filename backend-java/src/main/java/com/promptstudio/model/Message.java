package com.promptstudio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "messages")
@Getter
@Setter
public class Message {

    @Id
    @Column(name = "id", columnDefinition = "character varying(36)", nullable = false)
    private String id;

    @Column(name = "conversation_id", columnDefinition = "character varying(36)", nullable = false)
    private String conversationId;

    @Column(name = "user_id", columnDefinition = "character varying(36)", nullable = false)
    private String userId;

    @Column(name = "role", columnDefinition = "character varying(50)", nullable = false)
    private String role;

    @Column(name = "content", columnDefinition = "text", nullable = false)
    private String content;

    @Column(name = "created_at", columnDefinition = "timestamp with time zone")
    private ZonedDateTime createdAt;

    public Message() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = ZonedDateTime.now();
    }
}
