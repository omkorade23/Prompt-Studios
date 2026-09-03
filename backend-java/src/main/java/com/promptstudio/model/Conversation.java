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
@Table(name = "conversations")
@Getter
@Setter
public class Conversation {

    @Id
    @Column(name = "id", columnDefinition = "character varying(36)", nullable = false)
    private String id;

    @Column(name = "user_id", columnDefinition = "character varying(36)", nullable = false)
    private String userId;

    @Column(name = "title", columnDefinition = "character varying(255)", nullable = false)
    private String title;

    @Column(name = "created_at", columnDefinition = "timestamp with time zone")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "timestamp with time zone")
    private ZonedDateTime updatedAt;

    public Conversation() {
        this.id = UUID.randomUUID().toString();
        this.title = "New Conversation";
        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
    }
}
