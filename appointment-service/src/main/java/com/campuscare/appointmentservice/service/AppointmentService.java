package com.campuscare.appointmentservice.service;

import com.campuscare.appointmentservice.model.Appointment;
import com.campuscare.appointmentservice.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository) {

        this.appointmentRepository = appointmentRepository;
    }

    public Appointment createAppointment(
            Appointment appointment) {

        if (appointment.getStatus() == null ||
                appointment.getStatus().isBlank()) {

            appointment.setStatus("PENDING");
        }

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(String id) {

        return appointmentRepository
                .findById(id)
                .orElse(null);
    }

    public List<Appointment> getAppointmentsByUser(
            String userId) {

        return appointmentRepository.findByUserId(userId);
    }

    public List<Appointment> getAppointmentsByStatus(
            String status) {

        return appointmentRepository.findByStatus(status);
    }

    public List<Appointment> getAppointmentsByServiceType(
            String serviceType) {

        return appointmentRepository
                .findByServiceType(serviceType);
    }

    public Appointment updateAppointmentStatus(
            String id,
            String status) {

        Appointment appointment =
                appointmentRepository
                        .findById(id)
                        .orElse(null);

        if (appointment != null) {
            appointment.setStatus(status);
            return appointmentRepository.save(appointment);
        }

        return null;
    }

    public void deleteAppointment(String id) {
        appointmentRepository.deleteById(id);
    }
}