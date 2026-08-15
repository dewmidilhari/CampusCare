package com.campuscare.requestservice.controller;

import com.campuscare.requestservice.model.Request;
import com.campuscare.requestservice.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(
        origins = {
                "http://127.0.0.1:5501",
                "http://localhost:5501"
        },
        allowedHeaders = "*",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.PATCH,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    // =====================================================
    // CREATE REQUEST
    // =====================================================

    @PostMapping
    public ResponseEntity<Request> createRequest(
            @RequestBody Request request) {

        return ResponseEntity.ok(
                requestService.createRequest(request)
        );
    }

    // =====================================================
    // GET ALL REQUESTS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {

        return ResponseEntity.ok(
                requestService.getAllRequests()
        );
    }

    // =====================================================
    // GET REQUEST BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(
            @PathVariable String id) {

        Request request =
                requestService.getRequestById(id);

        if (request == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(request);
    }

    // =====================================================
    // GET REQUESTS BY USER
    // =====================================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Request>> getRequestsByUser(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                requestService.getRequestsByUser(userId)
        );
    }

    // =====================================================
    // GET REQUESTS BY TYPE
    // =====================================================

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Request>> getRequestsByType(
            @PathVariable String type) {

        return ResponseEntity.ok(
                requestService.getRequestsByType(type)
        );
    }

    // =====================================================
    // GET REQUESTS BY STATUS
    // =====================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Request>> getRequestsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                requestService.getRequestsByStatus(status)
        );
    }

    // =====================================================
    // UPDATE REQUEST STATUS
    // =====================================================

    @PatchMapping("/{id}/status")
    public ResponseEntity<Request> updateStatus(
            @PathVariable String id,
            @RequestParam String status) {

        Request request =
                requestService.updateRequestStatus(id, status);

        if (request == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(request);
    }

    // =====================================================
    // DELETE REQUEST
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(
            @PathVariable String id) {

        requestService.deleteRequest(id);

        return ResponseEntity.noContent().build();
    }
}