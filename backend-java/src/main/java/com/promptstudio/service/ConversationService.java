package com.promptstudio.service;

import com.promptstudio.dto.ConversationDto;
import com.promptstudio.dto.DtoMapper;
import com.promptstudio.dto.MessageDto;
import com.promptstudio.exception.ApiException;
import com.promptstudio.model.Conversation;
import com.promptstudio.model.Message;
import com.promptstudio.repository.ConversationRepository;
import com.promptstudio.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public ConversationService(ConversationRepository conversationRepository, MessageRepository messageRepository) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    @Transactional
    public ConversationDto createConversation(String userId, String title) {
        Conversation conv = new Conversation();
        conv.setUserId(userId);
        conv.setTitle(title == null ? "New Conversation" : title);
        conv = conversationRepository.save(conv);
        return DtoMapper.toDto(conv);
    }

    public List<ConversationDto> getUserConversations(String userId) {
        return conversationRepository.findByUserIdOrderByUpdatedAtDesc(userId)
                .stream()
                .map(DtoMapper::toDto)
                .collect(Collectors.toList());
    }

    public Conversation getConversationEntity(String userId, String conversationId) {
        Conversation conv = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ApiException("Conversation not found", 404));
        if (!conv.getUserId().equals(userId)) {
            throw new ApiException("Unauthorized conversation access", 403);
        }
        return conv;
    }

    public ConversationDto getConversation(String userId, String conversationId) {
        return DtoMapper.toDto(getConversationEntity(userId, conversationId));
    }

    @Transactional
    public ConversationDto renameConversation(String userId, String conversationId, String newTitle) {
        Conversation conv = getConversationEntity(userId, conversationId);
        conv.setTitle(newTitle);
        conv.setUpdatedAt(ZonedDateTime.now());
        conv = conversationRepository.save(conv);
        return DtoMapper.toDto(conv);
    }

    @Transactional
    public boolean deleteConversation(String userId, String conversationId) {
        Conversation conv = getConversationEntity(userId, conversationId);
        messageRepository.deleteByConversationId(conversationId);
        conversationRepository.delete(conv);
        return true;
    }

    @Transactional
    public MessageDto addMessage(String userId, String conversationId, String role, String content) {
        Conversation conv = getConversationEntity(userId, conversationId);
        
        Message msg = new Message();
        msg.setConversationId(conversationId);
        msg.setUserId(userId);
        msg.setRole(role);
        msg.setContent(content);
        
        msg = messageRepository.save(msg);
        
        conv.setUpdatedAt(ZonedDateTime.now());
        conversationRepository.save(conv);
        
        return DtoMapper.toDto(msg);
    }

    public List<MessageDto> getMessages(String userId, String conversationId) {
        getConversationEntity(userId, conversationId); // ensures ownership
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId)
                .stream()
                .map(DtoMapper::toDto)
                .collect(Collectors.toList());
    }
}
