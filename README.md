# Backend API

This is the backend API for our application. It handles user authentication, rate limiting, and other essential services.

## Table of Contents

- Installation
- Configuration
- Usage
- API Endpoints
- Middleware
- Controllers
- Models
- Services

## Installation

1. Clone the repository:
    git clone [https://github.com/jbotmallen/app-dev-api/]
    cd app-dev-api

2. Install dependencies:
    npm install

## Configuration

Create a `.env` file in the root directory with the following content:

PORT=8080
JWT_SECRET=your_jwt_secret_key

Replace `your_jwt_secret_key` with a secure key of your choice.

## Usage

Start the server:
npm start

The server will run on the port specified in the `.env` file.

## API Endpoints

### Authentication

- **POST /api/auth/login**
  - Description: Logs in a user.
  - Request Body:
    {
      "identifier": "string",
      "password": "string"
    }
  - Response:
    {
      "status": 200,
      "message": "Login successful"
    }

- **POST /api/auth/register**
  - Description: Registers a new user.
  - Request Body:
    {
      "email": "string",
      "username": "string",
      "password": "string"
    }
  - Response:
    {
      "status": 201,
      "message": "Registration successful"
    }

- **POST /api/auth/logout**
  - Description: Logs out a user.
  - Response:
    {
      "status": 200,
      "message": "Logout successful"
    }

## Middleware
    Rate Limiter: Limits the number of requests to prevent abuse. Implemented in rateLimiter.js.
    Authentication Middleware: Verifies JWT tokens. Implemented in authMiddleware.js.

## Controllers
    Token Controller: Handles JWT token generation and authentication. Implemented in tokenController.js.

## Models
    User Model: Defines the user schema and interacts with the database. Implemented in userModel.js.

## Services
    Response Handler: Standardizes API responses. Implemented in responses.js.
    Sanitation Service: Sanitizes user input. Implemented in sanitation.js.
