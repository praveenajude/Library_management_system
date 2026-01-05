-- Create database
CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

-- Books table
CREATE TABLE IF NOT EXISTS books (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    isbn VARCHAR(50),
    pageCount INT,
    publishedDate DATETIME,
    thumbnailUrl TEXT,
    shortDescription TEXT,
    longDescription TEXT,
    status VARCHAR(50) DEFAULT 'PUBLISH',
    authors JSON,
    categories JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    birthDate DATE,
    password VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
    id VARCHAR(50) PRIMARY KEY,
    cartid VARCHAR(50) NOT NULL,
    carttitle VARCHAR(500) NOT NULL,
    cartimage TEXT,
    cartauthors JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin and user accounts
INSERT INTO users (id, firstName, lastName, email, phone, address, birthDate, role) VALUES
('admin1', 'Admin', 'User', 'admin@gmail.com', '1234567890', 'Admin Address', '1990-01-01', 'admin'),
('user1', 'Regular', 'User', 'user@gmail.com', '0987654321', 'User Address', '1995-01-01', 'user')
ON DUPLICATE KEY UPDATE email=email;

