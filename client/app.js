const USER_API_URL = "http://localhost:8083/api/users";
const USER_API_KEY = "campuscare-user-2026";

const REQUEST_API_URL = "http://localhost:8083/api/requests";
const REQUEST_API_KEY = "campuscare-request-2026";


// =====================================================
// LOGIN
// =====================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();

        const message =
            document.getElementById("message");


        if (email === "" || password === "") {

            message.innerText =
                "Please enter email and password.";

            return;
        }


        try {

            const response = await fetch(
                `${USER_API_URL}/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": USER_API_KEY
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            if (response.ok) {

                const user =
                    await response.json();


                localStorage.setItem(
                    "campuscareUser",
                    JSON.stringify(user)
                );


                window.location.href =
                    "dashboard.html";


            } else if (response.status === 401) {

                message.innerText =
                    "Invalid email or password.";


            } else {

                message.innerText =
                    "Login failed. Please try again.";

            }


        } catch (error) {

            console.error(error);

            message.innerText =
                "Cannot connect to User Service. Please start the server.";

        }

    });

}



// =====================================================
// REGISTER
// =====================================================

function register() {

    alert("Registration page will be added next.");

}



// =====================================================
// USER SERVICE
// =====================================================

function openUserService() {

    window.location.href =
        "user-service.html";

}



// =====================================================
// REQUEST SERVICE
// =====================================================

function openRequestService() {

    window.location.href =
        "request-service.html";

}



/// =====================================================
// APPOINTMENT SERVICE
// =====================================================

const APPOINTMENT_API_URL =
    "http://localhost:8083/api/appointments";

const APPOINTMENT_API_KEY =
    "campuscare-appointment-2026";


// =====================================================
// OPEN APPOINTMENT SERVICE
// =====================================================

function openAppointmentService() {

    window.location.href =
        "appointment-service.html";

}


// =====================================================
// CREATE APPOINTMENT
// =====================================================

async function createAppointment() {

    const serviceType =
        document.getElementById("serviceType");

    const title =
        document.getElementById("appointmentTitle");

    const description =
        document.getElementById("appointmentDescription");

    const appointmentDate =
        document.getElementById("appointmentDate");

    const appointmentTime =
        document.getElementById("appointmentTime");

    const message =
        document.getElementById("appointmentMessage");


    if (!serviceType ||
        !title ||
        !description ||
        !appointmentDate ||
        !appointmentTime ||
        !message) {

        console.error("Appointment form elements not found.");
        return;
    }


    // =================================================
    // VALIDATION
    // =================================================

    if (serviceType.value === "") {

        message.innerText =
            "Please select a service type.";

        return;
    }


    if (title.value.trim() === "") {

        message.innerText =
            "Please enter appointment title.";

        return;
    }


    if (description.value.trim() === "") {

        message.innerText =
            "Please enter appointment description.";

        return;
    }


    if (appointmentDate.value === "") {

        message.innerText =
            "Please select appointment date.";

        return;
    }


    if (appointmentTime.value === "") {

        message.innerText =
            "Please select appointment time.";

        return;
    }


    // =================================================
    // GET LOGGED-IN USER
    // =================================================

    const userData =
        localStorage.getItem("campuscareUser");


    if (!userData) {

        message.innerText =
            "Please login first.";

        return;
    }


    let user;

    try {

        user =
            JSON.parse(userData);

    } catch (error) {

        console.error(error);

        message.innerText =
            "Invalid login information.";

        return;
    }


    if (!user.id) {

        message.innerText =
            "User ID not found. Please login again.";

        return;
    }


    // =================================================
    // SEND POST REQUEST
    // =================================================

    try {

        const response =
            await fetch(
                APPOINTMENT_API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": APPOINTMENT_API_KEY
                    },

                    body: JSON.stringify({

                        userId:
                            user.id,

                        serviceType:
                            serviceType.value,

                        title:
                            title.value.trim(),

                        description:
                            description.value.trim(),

                        appointmentDate:
                            appointmentDate.value,

                        appointmentTime:
                            appointmentTime.value,

                        status:
                            "PENDING"
                    })
                }
            );


        if (response.ok) {

            const appointment =
                await response.json();


            console.log(
                "Created appointment:",
                appointment
            );


            message.innerText =
                "Appointment booked successfully!";


            // Clear fields

            serviceType.value = "";

            title.value = "";

            description.value = "";

            appointmentDate.value = "";

            appointmentTime.value = "";


            // Reload appointments

            await loadMyAppointments();


        } else if (response.status === 401) {

            message.innerText =
                "Invalid or missing Appointment Service API Key.";


        } else {

            const errorText =
                await response.text();

            console.error(
                "Appointment error:",
                errorText
            );

            message.innerText =
                "Failed to book appointment.";

        }


    } catch (error) {

        console.error(
            "Appointment POST error:",
            error
        );

        message.innerText =
            "Cannot connect to Appointment Service.";
    }

}


// =====================================================
// LOAD MY APPOINTMENTS
// =====================================================

async function loadMyAppointments() {

    const appointmentList =
        document.getElementById(
            "appointmentList"
        );


    if (!appointmentList) {

        return;
    }


    // =================================================
    // GET LOGGED-IN USER
    // =================================================

    const userData =
        localStorage.getItem(
            "campuscareUser"
        );


    if (!userData) {

        appointmentList.innerHTML =
            "<p>Please login first.</p>";

        return;
    }


    let user;

    try {

        user =
            JSON.parse(userData);

    } catch (error) {

        console.error(error);

        appointmentList.innerHTML =
            "<p>Invalid login information.</p>";

        return;
    }


    if (!user.id) {

        appointmentList.innerHTML =
            "<p>User ID not found. Please login again.</p>";

        return;
    }


    // =================================================
    // GET APPOINTMENTS
    // =================================================

    try {

        const response =
            await fetch(
                `${APPOINTMENT_API_URL}/user/${user.id}`,
                {
                    method: "GET",

                    headers: {
                        "X-API-KEY": APPOINTMENT_API_KEY
                    }
                }
            );


        if (response.status === 401) {

            appointmentList.innerHTML =
                "<p>Invalid or missing Appointment Service API Key.</p>";

            return;
        }


        if (!response.ok) {

            appointmentList.innerHTML =
                "<p>Failed to load appointments.</p>";

            return;
        }


        const appointments =
            await response.json();


        if (
            !Array.isArray(appointments) ||
            appointments.length === 0
        ) {

            appointmentList.innerHTML =
                "<p>No appointments yet.</p>";

            return;
        }


        appointmentList.innerHTML = "";


        appointments.forEach(
            function (appointment) {

                const appointmentCard =
                    document.createElement("div");


                appointmentCard.className =
                    "appointment-item";


                appointmentCard.innerHTML = `

                    <p>
                        <strong>Appointment ID:</strong>
                        ${appointment.id || ""}
                    </p>

                    <p>
                        <strong>Service Type:</strong>
                        ${appointment.serviceType || ""}
                    </p>

                    <p>
                        <strong>Title:</strong>
                        ${appointment.title || ""}
                    </p>

                    <p>
                        <strong>Description:</strong>
                        ${appointment.description || ""}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${appointment.appointmentDate || ""}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ${appointment.appointmentTime || ""}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${appointment.status || "PENDING"}
                    </p>

                    <button
                        class="appointment-delete"
                        onclick="deleteAppointment('${appointment.id}')">

                        Cancel Appointment

                    </button>

                `;


                appointmentList.appendChild(
                    appointmentCard
                );

            }
        );


    } catch (error) {

        console.error(
            "Appointment GET error:",
            error
        );

        appointmentList.innerHTML =
            "<p>Cannot connect to Appointment Service.</p>";
    }

}


// =====================================================
// DELETE APPOINTMENT
// =====================================================

async function deleteAppointment(
    appointmentId
) {

    const confirmDelete =
        confirm(
            "Are you sure you want to cancel this appointment?"
        );


    if (!confirmDelete) {

        return;
    }


    try {

        const response =
            await fetch(
                `${APPOINTMENT_API_URL}/${appointmentId}`,
                {
                    method: "DELETE",

                    headers: {
                        "X-API-KEY": APPOINTMENT_API_KEY
                    }
                }
            );


        if (response.ok) {

            alert(
                "Appointment cancelled successfully."
            );


            await loadMyAppointments();


        } else if (response.status === 401) {

            alert(
                "Invalid or missing Appointment Service API Key."
            );


        } else {

            const errorText =
                await response.text();

            console.error(
                "Delete appointment error:",
                errorText
            );


            alert(
                "Failed to cancel appointment."
            );

        }


    } catch (error) {

        console.error(
            "Appointment DELETE error:",
            error
        );


        alert(
            "Cannot connect to Appointment Service."
        );

    }

}


// =====================================================
// LOAD APPOINTMENTS WHEN PAGE OPENS
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadMyAppointments();

    }
);



// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem(
        "campuscareUser"
    );

    window.location.href =
        "index.html";

}



// =====================================================
// LOAD USER PROFILE
// =====================================================

function loadUserDetails() {

    const userDetails =
        document.getElementById("userDetails");


    if (!userDetails) {

        return;

    }


    const userData =
        localStorage.getItem(
            "campuscareUser"
        );


    if (!userData) {

        userDetails.innerHTML = `
            <p>Please login first.</p>
        `;

        return;

    }


    try {

        const user =
            JSON.parse(userData);


        userDetails.innerHTML = `

            <p>
                <strong>Name:</strong>
                ${user.name || ""}
            </p>

            <p>
                <strong>Email:</strong>
                ${user.email || ""}
            </p>

            <p>
                <strong>Role:</strong>
                ${user.role || ""}
            </p>

            <p>
                <strong>User ID:</strong>
                ${user.id || ""}
            </p>

        `;

    } catch (error) {

        console.error(error);

        userDetails.innerHTML =
            "<p>Unable to load user details.</p>";

    }

}



// =====================================================
// BACK TO DASHBOARD
// =====================================================

function goToDashboard() {

    window.location.href =
        "dashboard.html";

}



// =====================================================
// EDIT PROFILE
// =====================================================

function editProfile() {

    const userData =
        localStorage.getItem("campuscareUser");

    if (!userData) {
        alert("Please login first.");
        return;
    }

    const user = JSON.parse(userData);

    document.getElementById("editName").value =
        user.name || "";

    document.getElementById("editEmail").value =
        user.email || "";

    document.getElementById("editPassword").value =
        user.password || "";

    document.getElementById("editRole").value =
        user.role || "STUDENT";

    document.getElementById("editProfileForm").style.display =
        "block";
}

// =====================================================
// SAVE PROFILE
// =====================================================

async function saveProfile() {

    const userData =
        localStorage.getItem("campuscareUser");


    if (!userData) {

        alert("Please login first.");

        return;

    }


    let user;

    try {

        user =
            JSON.parse(userData);

    } catch (error) {

        console.error(error);

        alert("Invalid login information.");

        return;

    }


    const name =
        document.getElementById("editName").value.trim();


    const email =
        document.getElementById("editEmail").value.trim();


    const password =
        document.getElementById("editPassword").value.trim();


    const role =
        document.getElementById("editRole").value;


    // Validate name

    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    // Validate email

    if (email === "") {

        alert("Please enter your email.");

        return;

    }


    // Validate password

    if (password === "") {

        alert("Please enter your password.");

        return;

    }


    // Validate role

    if (role === "") {

        alert("Please select your role.");

        return;

    }


    // Update user

    await updateUser(
        user.id,
        name,
        email,
        password,
        role
    );

}

// =====================================================
// UPDATE USER
// =====================================================

async function updateUser(
    userId,
    name,
    email,
    password,
    role
) {

    try {

        const response =
            await fetch(
                `${USER_API_URL}/${userId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": USER_API_KEY
                    },

                    body: JSON.stringify({

                        name: name,
                        email: email,
                        password: password,
                        role: role

                    })
                }
            );


        if (response.ok) {

            const updatedUser =
                await response.json();


            localStorage.setItem(
                "campuscareUser",
                JSON.stringify(updatedUser)
            );


            alert(
                "Profile updated successfully!"
            );


            location.reload();


        } else if (response.status === 401) {

            alert(
                "Invalid or missing User Service API Key."
            );


        } else {

            alert(
                "Failed to update profile."
            );

        }


    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to User Service. Please start the server."
        );

    }

}



// =====================================================
// DELETE USER ACCOUNT
// =====================================================

async function deleteAccount() {

    const userData =
        localStorage.getItem(
            "campuscareUser"
        );


    if (!userData) {

        alert("Please login first.");

        return;

    }


    const user =
        JSON.parse(userData);


    const confirmDelete =
        confirm(
            "Are you sure you want to delete your account?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `${USER_API_URL}/${user.id}`,
                {
                    method: "DELETE",

                    headers: {
                        "X-API-KEY": USER_API_KEY
                    }
                }
            );


        if (response.ok) {

            localStorage.removeItem(
                "campuscareUser"
            );


            alert(
                "Account deleted successfully."
            );


            window.location.href =
                "index.html";


        } else if (response.status === 401) {

            alert(
                "Invalid or missing User Service API Key."
            );


        } else {

            alert(
                "Failed to delete account."
            );

        }


    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to User Service."
        );

    }

}



// =====================================================
// CREATE REQUEST
// =====================================================

async function createRequest() {

    const requestType =
        document.getElementById(
            "requestType"
        );


    const requestDescription =
        document.getElementById(
            "requestDescription"
        );


    const requestMessage =
        document.getElementById(
            "requestMessage"
        );


    if (
        !requestType ||
        !requestDescription ||
        !requestMessage
    ) {

        return;

    }


    const type =
        requestType.value;


    const description =
        requestDescription.value.trim();


    // Check request type

    if (type === "") {

        requestMessage.innerText =
            "Please select a request type.";

        return;

    }


    // Check description

    if (description === "") {

        requestMessage.innerText =
            "Please enter a description.";

        return;

    }


    // Check logged-in user

    const userData =
        localStorage.getItem(
            "campuscareUser"
        );


    if (!userData) {

        requestMessage.innerText =
            "Please login first.";

        return;

    }


    let user;

    try {

        user =
            JSON.parse(userData);

    } catch (error) {

        console.error(error);

        requestMessage.innerText =
            "Invalid login information.";

        return;

    }


    try {

        const response =
            await fetch(
                REQUEST_API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": REQUEST_API_KEY
                    },

                    body: JSON.stringify({

                        userId: user.id,

                        type: type,

                        description: description,

                        status: "PENDING"

                    })
                }
            );


        if (response.ok) {

            const createdRequest =
                await response.json();

            console.log(
                "Created request:",
                createdRequest
            );


            requestMessage.innerText =
                "Request created successfully!";


            requestType.value = "";

            requestDescription.value = "";


            loadMyRequests();


        } else if (response.status === 401) {

            requestMessage.innerText =
                "Invalid or missing Request Service API Key.";


        } else {

            requestMessage.innerText =
                "Failed to create request.";

        }


    } catch (error) {

        console.error(error);

        requestMessage.innerText =
            "Cannot connect to Request Service. Please start the server.";

    }

}



// =====================================================
// LOAD MY REQUESTS
// =====================================================

async function loadMyRequests() {

    const requestList =
        document.getElementById(
            "requestList"
        );


    if (!requestList) {

        return;

    }


    const userData =
        localStorage.getItem(
            "campuscareUser"
        );


    if (!userData) {

        requestList.innerHTML =
            "<p>Please login first.</p>";

        return;

    }


    let user;

    try {

        user =
            JSON.parse(userData);

    } catch (error) {

        console.error(error);

        requestList.innerHTML =
            "<p>Invalid login information.</p>";

        return;

    }


    try {

        const response =
            await fetch(
                `${REQUEST_API_URL}/user/${user.id}`,
                {
                    method: "GET",

                    headers: {
                        "X-API-KEY": REQUEST_API_KEY
                    }
                }
            );


        if (response.status === 401) {

            requestList.innerHTML =
                "<p>Invalid or missing Request Service API Key.</p>";

            return;

        }


        if (!response.ok) {

            requestList.innerHTML =
                "<p>Failed to load requests.</p>";

            return;

        }


        const requests =
            await response.json();


        if (
            !Array.isArray(requests) ||
            requests.length === 0
        ) {

            requestList.innerHTML =
                "<p>No service requests yet.</p>";

            return;

        }


        requestList.innerHTML = "";


        requests.forEach(function (request) {

            const requestCard =
                document.createElement(
                    "div"
                );


            requestCard.style.border =
                "1px solid #ddd";

            requestCard.style.padding =
                "15px";

            requestCard.style.marginBottom =
                "10px";

            requestCard.style.borderRadius =
                "8px";


            requestCard.innerHTML = `

                <p>
                    <strong>Request ID:</strong>
                    ${request.id || ""}
                </p>

                <p>
                    <strong>Type:</strong>
                    ${request.type || ""}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${request.description || ""}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${request.status || "PENDING"}
                </p>

                <button
                    onclick="deleteRequest('${request.id}')">

                    Delete Request

                </button>

            `;


            requestList.appendChild(
                requestCard
            );

        });


    } catch (error) {

        console.error(error);

        requestList.innerHTML =
            "<p>Cannot connect to Request Service.</p>";

    }

}



// =====================================================
// DELETE REQUEST
// =====================================================

async function deleteRequest(requestId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this request?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `${REQUEST_API_URL}/${requestId}`,
                {
                    method: "DELETE",

                    headers: {
                        "X-API-KEY": REQUEST_API_KEY
                    }
                }
            );


        if (response.ok) {

            alert(
                "Request deleted successfully."
            );


            loadMyRequests();


        } else if (response.status === 401) {

            alert(
                "Invalid or missing Request Service API Key."
            );


        } else {

            alert(
                "Failed to delete request."
            );

        }


    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to Request Service."
        );

    }

}



// =====================================================
// LOAD FUNCTIONS WHEN PAGE OPENS
// =====================================================

loadUserDetails();

loadMyRequests();