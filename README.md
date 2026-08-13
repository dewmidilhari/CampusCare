# CampusCare - University Service Management System

CampusCare is a microservices-based university service management system developed for the Service-Oriented Computing group project.

The system allows university students to manage users, submit service requests, make appointments, and receive notifications through a single client application.

---

## Project Overview

CampusCare is designed using a microservices architecture.

Each team member is responsible for one main microservice, while the API Gateway provides a single entry point for the client application.

### Main Features

- User registration and login
- User authentication
- Service request management
- IT, maintenance and library requests
- Appointment management
- Appointment status tracking
- Notifications
- API Key security
- OAuth 2.0 authentication
- CORS configuration
- Rate limiting
- Swagger API documentation
- Docker containerization

---


# 2. System Architecture

```text
                         ┌─────────────────────────┐
                         │     Unified Client      │
                         │   Web / Frontend App    │
                         └────────────┬────────────┘
                                      │
                                      │ HTTP / REST
                                      ▼
                         ┌─────────────────────────┐
                         │      API Gateway        │
                         │                         │
                         │  OAuth 2.0 / JWT        │
                         │  CORS                   │
                         │  Rate Limiting          │
                         │  Request Routing        │
                         └────────────┬────────────┘
                                      │
                   ┌──────────────────┼──────────────────┐
                   │                  │                  │
                   ▼                  ▼                  ▼
          ┌────────────────┐ ┌────────────────┐ ┌────────────────────┐
          │  User Service  │ │ Request        │ │ Appointment &      │
          │                │ │ Service        │ │ Notification       │
          │   Member 1     │ │                │ │ Service            │
          │                │ │   Member 2     │ │                    │
          │ Auth / Users   │ │ IT Requests    │ │ Appointments       │
          │ Login /        │ │ Maintenance    │ │ Notifications      │
          │ Register       │ │ Library        │ │                    │
          └───────┬────────┘ └───────┬────────┘ └──────────┬─────────┘
                  │                  │                     │
                  └──────────────────┼─────────────────────┘
                                     │
                                     ▼
                           ┌──────────────────┐
                           │     MongoDB      │
                           │    Database      │
                           └──────────────────┘
```

---
# 3. Team Members and Work Division

The project is divided among three team members.

| Member | Role | Microservice | Main Responsibilities |
|--------|------|--------------|------------------------|
| Member 1 | Gateway Lead | user-service | User registration, login, authentication, API Gateway, OAuth 2.0, CORS, Rate Limiting |
| Member 2 | Member | request-service | IT requests, Maintenance requests, Library requests, request status, API Key security |
| Member 3 | Member | appointment-service | Appointment creation, appointment viewing, appointment status, notifications, API Key security |

--- 


# 38. Conclusion

CampusCare is a microservices-based University Service Management
System designed using Service-Oriented Computing principles.

The system separates business responsibilities into independent
microservices while providing a single entry point through an API
Gateway.

The three main services are:

```text
User & Authentication Service
             +
Service Request Service
             +
Appointment & Notification Service
             =
          CampusCare
```

The project demonstrates:

- Microservices architecture
- RESTful API development
- API Key security
- OAuth 2.0 authentication
- JWT authorization
- API Gateway
- CORS
- Rate Limiting
- MongoDB
- Docker containerization
- Swagger / OpenAPI documentation
- Unified client integration

CampusCare is developed as a collaborative group project for the
Service-Oriented Computing module.                                           