package com.campuscare.appointmentservice.service;

import com.campuscare.appointmentservice.model.Notification;
import com.campuscare.appointmentservice.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(
            NotificationRepository notificationRepository) {

        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(
            Notification notification) {

        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsByUser(
            String userId) {

        return notificationRepository.findByUserId(userId);
    }

    public List<Notification> getUnreadNotifications() {

        return notificationRepository.findByReadFalse();
    }

    public Notification markAsRead(String id) {

        Notification notification =
                notificationRepository
                        .findById(id)
                        .orElse(null);

        if (notification != null) {

            notification.setRead(true);

            return notificationRepository.save(notification);
        }

        return null;
    }
}