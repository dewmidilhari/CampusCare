package com.campuscare.appointmentservice.repository;

import com.campuscare.appointmentservice.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRepository
        extends MongoRepository<Appointment, String> {

    List<Appointment> findByUserId(String userId);

    List<Appointment> findByStatus(String status);

    List<Appointment> findByServiceType(String serviceType);
}