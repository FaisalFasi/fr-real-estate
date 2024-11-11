# Real Estate Project

A full-stack real estate platform where users can browse listings, save favorites, and contact property owners. The platform also includes an admin dashboard for managing listings and user interactions.

## Features

- **Frontend**:  
  - Users can browse real estate listings.
  - Ability to filter properties based on location, price, and more.
  - Users can save favorite properties.
  - Interactive maps to view property locations using **Leaflet**.
  - Real-time notifications with **Socket.io**.
  
- **Backend**:  
  - Handles user authentication and authorization.
  - Admins can manage listings, including adding, editing, and deleting properties.
  - Integration with **Prisma** for managing database operations.
  - Real-time messaging for communication between users and property owners.

## Tech Stack

**Frontend**:
- **React**: For building user interfaces.
- **Vite**: For fast development and production builds.
- **MUI (Material-UI)**: For UI components.
- **Leaflet**: For embedding interactive maps.
- **React-Leaflet**: For integrating Leaflet maps with React.
- **Socket.io**: For real-time notifications.
- **Tailwind CSS**: For utility-first styling.
- **Zustand**: For state management.
- **Axios**: For making API requests.

**Backend**:
- **Node.js**: Server-side runtime.
- **Express**: For building RESTful APIs.
- **Prisma ORM**: For interacting with the database.
- **JWT**: For authentication and authorization.
- **bcryptjs**: For password hashing.
- **Socket.io**: For handling real-time events.

## Installation

### 1. Clone the repository
Clone both the **frontend** and **backend** repositories to your local machine.


git clone this repository
cd fr-real-estate

## 2. Install Dependencies

### Frontend
Navigate to the frontend folder and install the required dependencies:


### Backend
Navigate to the API folder and install the required dependencies:


## 3. Set Up Environment Variables

Create a `.env` file in both the frontend and backend directories and add the following variables:

### Frontend `.env`:


## 4. Run the Development Server

### Frontend


Visit [http://localhost:3000](http://localhost:3000) to view the frontend.

### Backend


The backend will be available at [http://localhost:8800](http://localhost:8800).

## API Endpoints

### User Authentication
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Login a user.
- **POST /auth/logout**: Logout a user.

### Listings
- **GET /listings**: Fetch all real estate listings.
- **GET /listings/:id**: Fetch a specific listing by ID.
- **POST /listings**: Add a new listing (Admin only).
- **PUT /listings/:id**: Update a listing (Admin only).
- **DELETE /listings/:id**: Delete a listing (Admin only).

### Real-time Messaging
- **POST /messages**: Send a message to a property owner (Socket.io).

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

