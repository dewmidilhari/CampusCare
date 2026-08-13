package com.campuscare.appointmentservice.controller;

import com.campuscare.appointmentservice.model.Appointment;
import com.campuscare.appointmentservice.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {

        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(
            @RequestBody Appointment appointment) {

        return ResponseEntity.ok(
                appointmentService.createAppointment(appointment)
        );
    }

    @GetMapping
    public ResponseEntity<List<Appointment>>
    getAllAppointments() {

        return ResponseEntity.ok(
                appointmentService.getAllAppointments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(
            @PathVariable String id) {

        Appointment appointment =
                appointmentService.getAppointmentById(id);

        if (appointment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>>
    getAppointmentsByUser(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                appointmentService
                        .getAppointmentsByUser(userId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Appointment>>
    getAppointmentsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                appointmentService
                        .getAppointmentsByStatus(status)
        );
    }

    @GetMapping("/service/{serviceType}")
    public ResponseEntity<List<Appointment>>
    getAppointmentsByServiceType(
            @PathVariable String serviceType) {

        return ResponseEntity.ok(
                appointmentService
                        .getAppointmentsByServiceType(serviceType)
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(
            @PathVariable String id,
            @RequestParam String status) {

        Appointment appointment =
                appointmentService
                        .updateAppointmentStatus(id, status);

        if (appointment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(appointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(
            @PathVariable String id) {

        appointmentService.deleteAppointment(id);

        return ResponseEntity.noContent().build();
    }
}