# Memories Project

The Memories project is a full-stack web application built using the MERN stack with JWT authentication. It allows users to create, edit, and delete memories, along with the ability to like on them.

## Technologies Used

- **Frontend:**
  - React.js
  - Redux (for state management)
  - Axios (for making HTTP requests)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (database)
  - Mongoose (ODM for MongoDB)
  - JWT (JSON Web Token) for authentication

## Features

1. **User Authentication:**
   - Users can register and log in securely using JWT authentication.

2. **Create Memories:**
   - Authenticated users can create and share their memories.

3. **Edit and Delete:**
   - Users can edit and delete their own memories.

4. **Like:**
   - Users can like on each other's memories.

5. **Responsive Design:**
   - The application is designed to be responsive, ensuring a seamless experience on different devices.

## Project Structure

The project follows a standard MERN stack architecture:

- **client:**
  - Contains the React.js frontend code.

- **server:**
  - Contains the Node.js and Express.js backend code.
  - Handles user authentication, CRUD operations, and interactions with the MongoDB database.
