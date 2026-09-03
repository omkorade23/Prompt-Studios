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
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @Column(name = "id", columnDefinition = "character varying(36)", nullable = false)
    private String id;

    @Column(name = "google_id", columnDefinition = "character varying(255)", nullable = false, unique = true)
    private String googleId;

    @Column(name = "email", columnDefinition = "character varying(255)", nullable = false)
    private String email;

    @Column(name = "name", columnDefinition = "character varying(255)", nullable = false)
    private String name;

    @Column(name = "profile_picture", columnDefinition = "text")
    private String profilePicture;

    @Column(name = "created_at", columnDefinition = "timestamp with time zone")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "timestamp with time zone")
    private ZonedDateTime updatedAt;

    @Column(name = "last_login", columnDefinition = "timestamp with time zone")
    private ZonedDateTime lastLogin;

    public User() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
        this.lastLogin = ZonedDateTime.now();
    }
}
