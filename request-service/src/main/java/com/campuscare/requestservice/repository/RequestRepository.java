package com.campuscare.requestservice.repository;

import com.campuscare.requestservice.model.Request;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RequestRepository extends MongoRepository<Request, String> {

    List<Request> findByUserId(String userId);

    List<Request> findByType(String type);

    List<Request> findByStatus(String status);
}