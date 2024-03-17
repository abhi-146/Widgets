# MJ WIDGETS

The project focuses on the development of widgets, dynamic components that can be easily created, customized, and embedded into websites. Developers can contribute to the project by adding new widgets, enhancing existing ones, and adhering to the established conventions for backend and frontend development.

# Project Requirements

node (^v18.15.0)
npm (^v9.5.0)

## Frontend Dependencies

1. **@fortawesome/fontawesome-svg-core (^6.5.1)**
2. **@fortawesome/free-solid-svg-icons (^6.5.1)**
3. **@fortawesome/react-fontawesome (^0.2.0)**
4. **@reduxjs/toolkit (^2.1.0)**
5. **axios (^1.6.5)**
6. **dotenv (^16.4.2)**
7. **jsonwebtoken (^9.0.2)**
8. **react (^18.2.0)**
9. **react-dom (^18.2.0)**
10. **react-redux (^9.1.0)**
11. **react-router-dom (^6.21.3)**
12. **react-scripts (5.0.1)**
13. **redux (^5.0.1)**
14. **web-vitals (^2.1.4)**

## Backend Dependencies

1. **axios (^1.6.7)**
2. **cookie-parser (~1.4.4)**
3. **cors (^2.8.5)**
4. **debug (~2.6.9)**
5. **dotenv (^16.4.1)**
6. **express (~4.16.1)**
7. **express-validator (^7.0.1)**
8. **jsonwebtoken (^9.0.2)**
9. **mongoose (^8.1.1)**

# How to Run

Follow these steps to run the MERN stack project locally.

## Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm (Node Package Manager)](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

1. Clone the repository to your local machine:
   git clone repository-url

2. Navigate to the project directory:

    cd project-directory

- Install frontend dependencies:
cd ./frontend
npm install


- Install backend dependencies:
cd ./backend
npm update

Configuration
- Create a .env file in the backend directory and add following variables:
PORT ,
SERVER_URL ,
ACCESS_TOKEN_SECRET ,
REFRESH_TOKEN_SECRET ,
TOKEN_EXPIRY 

- Create a .env file in the frontend directory and add following variables:
REACT_APP_SERVER_URL

3. Running the Application
Start the MongoDB server.

- In the backend directory, run the backend server:
npm run devstart


- In the frontend directory, run the frontend development server:
npm run start

## Creating new widget
[Link to detailed instructions](https://docs.google.com/document/d/19qa-C8RmUXuvuatI8J4OSxZHtKgPYn4TwhqlJ2xNvOk/edit)
