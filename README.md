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

## Demo Screenshots
![image](https://github.com/user-attachments/assets/d5b78b2e-3659-4335-a5d3-544dad7c6596)
![image](https://github.com/user-attachments/assets/c6b36664-f196-4c1a-b4a9-163f550f4ec7)
![image](https://github.com/user-attachments/assets/4b1830f9-9fe3-41a3-8a90-d69cf0a6a4bd)
![image](https://github.com/user-attachments/assets/532776ef-fa59-4769-8995-95eb0ff103c1)
![image](https://github.com/user-attachments/assets/66e1025b-8502-40a6-a207-4b7c40591d74)


“This project is a part of a hackathon run by https://www.katomaran.com ”
