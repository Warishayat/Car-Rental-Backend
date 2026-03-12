# 🚗 Car Rent System - Backend

A **Node.js + Express + MongoDB** backend for a Car Rental System.
This API allows users to view cars, book them, and admins to manage cars and bookings.

---

# 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Cloudinary (Image Storage)
* Multer (File Uploads)
* JWT Authentication
* dotenv

---

# 📁 Project Structure

```
Car-Rent-System
│
└── Car-Rental-Backend
    │
    ├── Config
    │   ├── cloudinary.js
    │   └── database.js
    │
    ├── Controllers
    │   ├── auth_controller.js
    │   ├── booking_controller.js
    │   ├── car_controller.js
    │   └── contact_controller.js
    │
    ├── Middleware
    │
    ├── Models
    │   ├── Booking.js
    │   ├── Car.js
    │   ├── Contact.js
    │   └── Users.js
    │
    ├── Routes
    │   ├── auth_route.js
    │   ├── booking_route.js
    │   ├── car_route.js
    │   └── contact_route.js
    │
    ├── index.js
    ├── .gitignore
    └── package.json
```

---

# ⚙️ Installation

Clone the repository

```
git clone https://github.com/yourusername/car-rent-system.git
```

Go into project directory

```
cd Car-Rental-Backend
```

Install dependencies

```
npm install
```

Run the server

```
npm run dev
```

Server will run on:

```
http://localhost:8000
```

---

# 🔑 Environment Variables

Create a `.env` file in the root folder and add:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

JWT_SECRET=your_jwt_secret
```

---

# 🚀 API Modules

### Authentication

```
POST /auth/register
POST /auth/login
```

### Cars

```
POST /car
GET /car
GET /car/:id
PATCH /car/:id
DELETE /car/:id
```

### Booking

```
POST /booking
GET /booking
DELETE /booking/:id
```

### Contact

```
POST /contact
GET /contact
```

---

# ✨ Features

* User Authentication (JWT)
* Car Management (Admin)
* Car Booking System
* Image Upload using Cloudinary
* RESTful API Design
* MongoDB Data Validation

---

# 📌 Future Improvements

* Payment Integration
* Booking History
* Admin Dashboard
* Email Notifications
* Car Availability Tracking

---

# 👨‍💻 Author

**Waris Hayat**

Backend Developer
Node.js | Express | MongoDB
