# Workout App API

## This project is a REST API built with Express and MongoDB.
## It allows users to create, read, update, and delete workout entries.

## Features
User authentication (sign up, login, JWT-based sessions)
(CRUD) Create, read, update, and delete workout logs
Track workouts with workout names, durations, calories, and type of workout.
Input validation and error handling
Secure password hashing (using bcrypt)
Environment based config with dotenv
Database integration using MongoDB
Added New Feature: Search & Sort 
Search allows users to find workouts by exerciseName or category
Sort allows users to order workouts by creation date (newest or oldest)
To test GET /workouts?search=cardio or GET /workouts?sort=newest

## Tech Stack
Node.js - Server-side runtime
Express - Web framework for building APIs
MongoDB - Database for storing workouts and users
JSON Web Token - User authentication
bcrypt - Password hashing
dotenv - Manage environment variables
Thunder Client - API testing

## How to run it locally
1. Verify node installation type "node -v" and you should see version numbers
2. Create project folder "mkdir my-app"
3. Initialize Node project "npm init -y"
4. Create your app file (app.js / index.js)
5. Run app by typing "node app.js"
6. Run a server typing "npm install express"
7. Make sure MongoDB is running
8. Run node server.js
9. Test routes in Postman or Thunder Client

## Environment Variables
PORT=
MONGO_URI=
JWT_SECRET=

## Main Routes / Endpoints
POST /auth/register
POST /auth/login
GET /workouts (protected)
GET /workouts/:id (protected)
POST /workouts (protected)
PUT /workouts/:id (protected)
DELETE /workouts/:id (protected)