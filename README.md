# 🚗 Car Rental Backend API

A production-ready backend for a **Car Rental System** built using **Node.js, Express, MongoDB, and Redis**.
This project provides secure authentication, car management, booking functionality, caching, rate limiting, and full API documentation with Swagger.

The API is fully containerized using **Docker** and deployed live.

---

# 🌐 Live API

Production URL

https://car-rental-system-latest.onrender.com

Swagger Documentation

https://car-rental-system-latest.onrender.com/api-docs

---

# 📌 Features

### 🔐 Authentication

* User Signup
* User Login
* JWT based authentication
* Protected routes

### 🚘 Car Management (Admin)

* Add new car with images
* Update car details
* Delete specific car
* Delete all cars
* Get car by ID
* Get all cars

### 📅 Booking System

* Book a car
* Cancel booking
* Get user bookings

### 👨‍💼 Admin Features

* View all bookings
* Cancel any booking
* View contact messages

### 📩 Contact System

Users can send messages to admin with:

* name
* email
* topic
* message

### ⚡ Performance Optimization

* Redis caching for frequently accessed APIs
* Rate limiting to prevent API abuse

### 📄 API Documentation

Interactive API docs using Swagger UI.

### 🐳 Containerization

Dockerized backend for easy deployment and scalability.

---

# 🛠 Tech Stack

Backend

* Node.js
* Express.js

Database

* MongoDB
* Mongoose

Caching

* Redis

Authentication

* JWT (JSON Web Token)

API Documentation

* Swagger UI

Containerization

* Docker

Deployment

* Render

---

# 📂 Project Structure

```
Car-Rental-Backend
│
├── Config
│   ├── database.js
│   ├── redis.js
│   └── swagger.js
│
├── Controllers
│   ├── auth_controller.js
│   ├── booking_controller.js
│   ├── car_controller.js
│   └── contact_controller.js
│
├── Middleware
│   ├── authMiddleware.js
│   ├── check_admin.js
│   ├── rateLimiter.js
│   └── upload.js
│
├── Models
│   ├── User.js
│   ├── Car.js
│   ├── Booking.js
│   └── Contact.js
│
├── Routes
│   ├── auth_route.js
│   ├── booking_route.js
│   ├── car_route.js
│   └── contact_route.js
│
├── utils
│   ├── generateInvoice.js
│   └── sendEmail.js
│
├── index.js
├── Dockerfile
└── README.md
```

---

# 🔑 Environment Variables

Create a `.env` file and add:

```
PORT=8000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

REDIS_URL=your_redis_url

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

# ⚙️ Installation (Local Setup)

Clone repository

```
git clone https://github.com/yourusername/car-rental-backend.git
```

Install dependencies

```
npm install
```

Run server

```
npm start
```

Server runs at

```
http://localhost:8000
```

Swagger docs

```
http://localhost:8000/api-docs
```

---

# 🐳 Run With Docker

Build Docker image

```
docker build -t car-rental-backend .
```

Run container

```
docker run -p 8000:8000 --env-file .env car-rental-backend
```

---

# 🚀 API Endpoints

### Authentication

POST /auth/signup
POST /auth/login

### Cars

GET /car/get-all-cars
GET /car/get-all-cars/:id
POST /car/add-car (Admin)
PUT /car/update-car/:id (Admin)
DELETE /car/delete-car/:id (Admin)

### Booking

POST /book/book-car
GET /book/my-booking/:id
PATCH /book/bookings/:id/cancel

### Admin

GET /admin/bookings/all
PATCH /admin/bookings/admin-cancel/:id

### Contact

POST /admin/contact-us
GET /admin/all-messages

---

# ⚡ Performance Improvements

Redis caching added for:

* Get all cars
* Get car by ID

Rate limiting added to protect APIs from abuse.

---

# 🔒 Security

* JWT Authentication
* Protected routes
* Admin role authorization
* Rate limiting
* Input validation

---

# 📈 Future Improvements

* Payment integration
* Background job queue
* Advanced search filters
* Car availability calendar
* Unit and integration testing

---

# 👨‍💻 Author

Waris Hayat

Backend Developer

GitHub: https://github.com/warishayat

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.
