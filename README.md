# CampusCare - University Service Management System

CampusCare is a microservices-based University Service Management System developed as a group project for the **Service-Oriented Computing** module.

The system provides university students with a centralized platform to register and authenticate, submit university service requests, manage appointments, and receive appointment notifications through a unified client application.

---

## 1. Project Overview

CampusCare follows a **microservices architecture**, where the system is divided into independent services based on specific business responsibilities.

The main components of the system are:

* **User & Authentication Service**
* **Service Request Service**
* **Appointment & Notification Service**
* **API Gateway**
* **Unified Client Application**
* **MongoDB Database**

The API Gateway acts as the main entry point between the client application and the backend microservices.

---

## 2. Main Features

### User & Authentication

* User registration
* User login
* User information management
* Authentication
* JWT-based authorization
* API security

### Service Request Management

Students can submit and manage different types of university service requests, including:

* IT service requests
* Maintenance requests
* Library-related requests
* Request status management
* View requests by user
* View requests by request type
* View requests by request status
* Update request status
* Delete requests

### Appointment Management

The appointment service provides:

* Create appointments
* View appointments
* View appointment details
* Update appointment status
* Manage appointment information
* Appointment-related notifications

### Notification Management

The notification functionality supports:

* Creating notifications
* Retrieving notifications for users
* Retrieving unread notifications
* Marking notifications as read
* Linking notifications with appointments

### API Gateway

The API Gateway provides:

* Centralized request routing
* Communication between client and backend services
* CORS configuration
* API security
* Centralized access to microservices

### Security

The system includes security mechanisms such as:

* JWT authentication
* API Key protection for secured services
* Request filtering
* Unauthorized request handling
* CORS configuration

### Deployment

The project supports containerized deployment using:

* Docker
* Dockerfiles for services
* Docker Compose
* MongoDB

---

## 3. System Architecture

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
                         │   Request Routing       │
                         │   Authentication        │
                         │   CORS                  │
                         │   API Security          │
                         └────────────┬────────────┘
                                      │
                 ┌────────────────────┼────────────────────┐
                 │                    │                    │
                 ▼                    ▼                    ▼
        ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐
        │  User Service   │  │ Request Service │  │ Appointment Service │
        │                 │  │                 │  │                     │
        │ Registration    │  │ IT Requests     │  │ Appointments        │
        │ Login           │  │ Maintenance     │  │ Appointment Status  │
        │ Authentication  │  │ Library         │  │ Notifications        │
        │ User Details    │  │ Request Status  │  │                     │
        └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘
                 │                    │                      │
                 └────────────────────┼──────────────────────┘
                                      │
                                      ▼
                           ┌─────────────────────┐
                           │       MongoDB       │
                           │      Database       │
                           └─────────────────────┘
```

---

## 4. Microservices

### 4.1 User Service

**Directory:**

```text
user-service/
```

The User Service is responsible for user-related functionality.

Main responsibilities:

* User registration
* User login
* Authentication
* User details
* JWT-based security
* User data management

---

### 4.2 Request Service

**Directory:**

```text
request-service/
```

The Request Service manages university service requests.

Main responsibilities:

* Create service requests
* Retrieve requests
* Retrieve requests by user
* Retrieve requests by type
* Retrieve requests by status
* Update request status
* Delete requests
* API Key security

---

### 4.3 Appointment & Notification Service

**Directory:**

```text
appointment-service/
```

The Appointment Service manages student appointments and related notifications.

Main responsibilities:

* Create appointments
* Retrieve appointments
* Update appointment status
* Manage appointment information
* Create notifications
* Retrieve user notifications
* Retrieve unread notifications
* Mark notifications as read
* API security

---

### 4.4 API Gateway

**Directory:**

```text
api-gateway/
```

The API Gateway provides a centralized entry point for the backend services.

Main responsibilities:

* Route client requests
* Connect client applications with backend services
* Handle CORS
* Provide centralized security
* Forward requests to appropriate microservices

---

### 4.5 Client Application

**Directory:**

```text
client/
```

The client application provides the user-facing interface for interacting with CampusCare.

It communicates with the backend through the API Gateway.

---

## 5. Team Members and Work Division

The project is divided among three team members.

| Member   | Role                   | Microservice                   | Main Responsibilities                                                                               |
| -------- | ---------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| Member 1 | Gateway Lead           | `user-service` + `api-gateway` | User registration, login, authentication, JWT security, API Gateway, CORS and gateway functionality |
| Member 2 | Service Request Member | `request-service`              | IT requests, maintenance requests, library requests, request status management and API Key security |
| Member 3 | Appointment Member     | `appointment-service`          | Appointment creation, appointment viewing, appointment status management and notifications          |

---

## 6. Technology Stack

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data MongoDB
* REST APIs
* Maven

### Database

* MongoDB

### Security

* JWT Authentication
* API Key Security
* Request Filters
* CORS

### Frontend

* Web-based client application
* HTML / CSS / JavaScript

### DevOps & Deployment

* Docker
* Docker Compose
* Dockerfiles

### API Documentation

* Swagger / OpenAPI where configured

### Version Control

* Git
* GitHub

---

## 7. Project Structure

```text
CampusCare/
│
├── api-gateway/
│   └── Dockerfile
│
├── appointment-service/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── request-service/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── user-service/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── client/
│   ├── src/
│   └── Dockerfile
│
├── docker-compose.yml
│
└── README.md
```

---

## 8. Communication Between Services

CampusCare uses REST-based communication between the client, API Gateway and backend microservices.

The general request flow is:

```text
Client
   │
   │ HTTP Request
   ▼
API Gateway
   │
   ├──────────────► User Service
   │
   ├──────────────► Request Service
   │
   └──────────────► Appointment Service
                         │
                         ▼
                     MongoDB
```

The API Gateway provides a single access point for the client application instead of requiring the client to communicate directly with every backend service.

---

## 9. Security Architecture

CampusCare includes multiple security mechanisms.

### JWT Authentication

JWT tokens are used for authenticated user access where configured.

```text
User
 │
 │ Login
 ▼
User Service
 │
 │ JWT
 ▼
Client
 │
 │ Authenticated Request
 ▼
API Gateway
 │
 ▼
Backend Service
```

### API Key Security

Selected services use API Key validation to protect service endpoints.

Requests without a valid API Key can be rejected with an unauthorized response.

### CORS

CORS configuration allows the client application to communicate with the backend services from the configured frontend origins.

---

## 10. Database

CampusCare uses **MongoDB** for data persistence.

The services use Spring Data MongoDB to interact with the database.

The database stores information related to:

* Users
* Service requests
* Appointments
* Notifications

The microservice architecture allows business responsibilities to remain separated while using MongoDB for persistence.

---

## 11. Docker

CampusCare supports containerized deployment.

Dockerfiles are provided for the main application components:

```text
api-gateway/Dockerfile
appointment-service/Dockerfile
client/Dockerfile
request-service/Dockerfile
user-service/Dockerfile
```

Docker Compose can be used to manage the application containers and supporting services together.

---

## 12. Running the Project

### Prerequisites

Install the following before running the project:

* Java JDK
* Maven
* Docker Desktop
* Git
* MongoDB, if running MongoDB outside Docker

### Clone the Repository

```bash
git clone https://github.com/dewmidilhari/CampusCare.git
cd CampusCare
```

### Run Using Docker Compose

From the project root:

```bash
docker compose up --build
```

To run the containers in the background:

```bash
docker compose up --build -d
```

To stop the containers:

```bash
docker compose down
```

---

## 13. Running Services Individually

Each Spring Boot microservice contains its own Maven configuration.

For example:

```bash
cd user-service
mvn spring-boot:run
```

For the request service:

```bash
cd request-service
mvn spring-boot:run
```

For the appointment service:

```bash
cd appointment-service
mvn spring-boot:run
```

The API Gateway can also be started separately from its project directory.

---

## 14. API Endpoints

The system provides RESTful endpoints for the major business operations.

### User Service

Examples:

```text
POST   /api/users/register
POST   /api/users/login
```

### Request Service

Examples:

```text
POST   /api/requests
GET    /api/requests
GET    /api/requests/user/{userId}
GET    /api/requests/type/{type}
GET    /api/requests/status/{status}
PATCH  /api/requests/{id}/status
DELETE /api/requests/{id}
```

### Appointment Service

Examples:

```text
POST   /api/appointments
GET    /api/appointments
PATCH  /api/appointments/{id}/status
```

### Notification

Examples of supported notification operations include:

```text
Create notification
Get notifications by user
Get unread notifications
Mark notification as read
```

> Endpoint paths may vary depending on the current controller configuration.

---

## 15. API Documentation

Where Swagger / OpenAPI is configured, the API documentation can be accessed through the service's configured Swagger endpoint.

Typical Spring Boot Swagger UI path:

```User Service API
http://localhost:8081/swagger-ui/index.html
```
```Request Service API
http://localhost:8082/swagger-ui/index.html#/request-controller
```
```Appointment Service API
http://localhost:8080/swagger-ui/index.html#/
```

The exact URL depends on the service port and configuration.

---

## 16. Git Branching and Collaboration

The project uses Git and GitHub for collaborative development.

Each member works on a dedicated branch before merging changes into the `main` branch.

Example:

```text
main
 │
 ├── ITBIN-2313-0024
 ├── ITBIN-2313-0028
 └── Other team branches
```

The development workflow is:

```text
Create Branch
     │
     ▼
Develop Feature
     │
     ▼
Commit Changes
     │
     ▼
Push Branch
     │
     ▼
Create Pull Request
     │
     ▼
Resolve Conflicts if Required
     │
     ▼
Merge into main
```

---

## 17. Project Benefits

CampusCare provides several benefits through its microservices architecture:

* Independent service development
* Separation of business responsibilities
* Easier maintenance
* Better scalability
* Independent deployment of services
* Centralized API access
* Improved security management
* Clear team responsibility separation
* Containerized deployment
* REST-based service communication

---

## 18. Service-Oriented Computing Concepts

The project demonstrates several concepts related to Service-Oriented Computing:

* Service decomposition
* Independent microservices
* RESTful service interfaces
* Service communication
* API Gateway pattern
* Authentication and authorization
* Centralized request routing
* Database-backed services
* Containerization
* Distributed application architecture

---

## 19. Future Improvements

Possible future improvements include:

* Enhanced role-based access control
* Improved notification delivery
* Email notifications
* Real-time notifications
* Advanced appointment scheduling
* Service discovery
* Centralized logging
* Monitoring and health checks
* Automated CI/CD pipelines
* Improved frontend user experience
* Automated integration testing
* More comprehensive API documentation

---

## 20. Conclusion

CampusCare is a microservices-based University Service Management System designed using Service-Oriented Computing principles.

The system separates major business responsibilities into independent services:

```text
User & Authentication Service
             +
Service Request Service
             +
Appointment & Notification Service
             +
API Gateway
             +
Unified Client
             =
          CampusCare
```

The project demonstrates practical implementation of:

* Microservices architecture
* RESTful API development
* User authentication
* JWT-based authorization
* API Key security
* API Gateway
* CORS
* MongoDB
* Docker containerization
* Git and GitHub collaboration
* Service-oriented architecture
* Unified client integration

CampusCare was developed as a collaborative group project for the **Service-Oriented Computing** module, with each team member responsible for a specific area of the system.

---

## About

**CampusCare - University Service Management System**

A university-focused microservices application for managing users, service requests, appointments and notifications through a unified platform.
