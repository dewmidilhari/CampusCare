package com.campuscare.appointmentservice.repository;

import com.campuscare.appointmentservice.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository
        extends MongoRepository<Notification, String> {

    List<Notification> findByUserId(String userId);

    List<Notification> findByReadFalse();
}