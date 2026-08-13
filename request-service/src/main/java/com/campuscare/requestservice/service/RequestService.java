package com.campuscare.requestservice.service;

import com.campuscare.requestservice.model.Request;
import com.campuscare.requestservice.repository.RequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public Request createRequest(Request request) {
        if (request.getStatus() == null || request.getStatus().isBlank()) {
            request.setStatus("PENDING");
        }

        return requestRepository.save(request);
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Request getRequestById(String id) {
        return requestRepository.findById(id).orElse(null);
    }

    public List<Request> getRequestsByUser(String userId) {
        return requestRepository.findByUserId(userId);
    }

    public List<Request> getRequestsByType(String type) {
        return requestRepository.findByType(type);
    }

    public List<Request> getRequestsByStatus(String status) {
        return requestRepository.findByStatus(status);
    }

    public Request updateRequestStatus(String id, String status) {
        Request request = requestRepository.findById(id).orElse(null);

        if (request != null) {
            request.setStatus(status);
            return requestRepository.save(request);
        }

        return null;
    }

    public void deleteRequest(String id) {
        requestRepository.deleteById(id);
    }
}