package com.promptstudio.dto;

import com.promptstudio.model.Conversation;
import com.promptstudio.model.Message;
import com.promptstudio.model.User;

public class DtoMapper {
    
    public static UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .googleId(user.getGoogleId())
                .email(user.getEmail())
                .name(user.getName())
                .profilePicture(user.getProfilePicture())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .lastLogin(user.getLastLogin())
                .build();
    }

    public static ConversationDto toDto(Conversation conv) {
        return ConversationDto.builder()
                .id(conv.getId())
                .userId(conv.getUserId())
                .title(conv.getTitle())
                .createdAt(conv.getCreatedAt())
                .updatedAt(conv.getUpdatedAt())
                .build();
    }

    public static MessageDto toDto(Message msg) {
        return MessageDto.builder()
                .id(msg.getId())
                .conversationId(msg.getConversationId())
                .userId(msg.getUserId())
                .role(msg.getRole())
                .content(msg.getContent())
                .createdAt(msg.getCreatedAt())
                .build();
    }
}
