# Todo Task Management App

This is a simple Todo Task Management Web Application built using React for the frontend and XAMPP (PHP + MySQL) for the backend.

## Features

- User authentication (login/signup)
- Create, read, update, and delete tasks (CRUD operations)
- Mark tasks as completed
- Filter tasks by status or search by task name
- Responsive and user-friendly UI

## Technology Stack

- Frontend: React.js
- Backend: PHP (running on XAMPP)
- Database: MySQL
- Version Control: Git & GitHub

step 1:

Navigate into the project directory:
cd todo

step 2:

For backend:
Make sure XAMPP is installed and running.
Import the provided SQL database file to your MySQL server.
Configure your PHP backend API connection to your local MySQL server.

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  status ENUM('Open', 'Complete') DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


step 3:
For frontend:
npm install
npm start

step 4:
Open your browser at http://localhost:3000 to use the app.





“This project is a part of a hackathon run by https://www.katomaran.com ”
