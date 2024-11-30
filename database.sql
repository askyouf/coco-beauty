CREATE DATABASE IF NOT EXISTS beauty_salon;
USE beauty_salon;

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    service VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    comments TEXT,
    referrer VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending'
);
