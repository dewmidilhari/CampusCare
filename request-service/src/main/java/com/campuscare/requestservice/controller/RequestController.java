package com.campuscare.requestservice.controller;

import com.campuscare.requestservice.model.Request;
import com.campuscare.requestservice.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    // Create a new request
    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        return ResponseEntity.ok(requestService.createRequest(request));
    }

    // Get all requests
    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    // Get request by ID
    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable String id) {
        Request request = requestService.getRequestById(id);

        if (request == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(request);
    }

    // Get requests by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Request>> getRequestsByUser(
            @PathVariable String userId) {

        return ResponseEntity.ok(requestService.getRequestsByUser(userId));
    }

    // Get requests by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Request>> getRequestsByType(
            @PathVariable String type) {

        return ResponseEntity.ok(requestService.getRequestsByType(type));
    }

    // Get requests by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Request>> getRequestsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(requestService.getRequestsByStatus(status));
    }

    // Update request status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Request> updateStatus(
            @PathVariable String id,
            @RequestParam String status) {

        Request request = requestService.updateRequestStatus(id, status);

        if (request == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(request);
    }

    // Delete request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable String id) {
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}