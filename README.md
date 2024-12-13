# Airbnb Clone

This project is a basic Airbnb clone, featuring user authentication, booking management, and host panel for managing listings and bookings. Built with React.js, MongoDB, and Node.js, this project demonstrates core functionality needed for an online property rental platform.

## Features

### User Authentication
- **Signup Page**: A registration form for new users.
- **Login Page**: A login form for existing users.

### Admin Panel
- **Listings Management**: Admin can view, add, and remove property listings.
- **Bookings Management**: Admin can view all bookings, including user and property details.

### Protected Routes
- **User Profile**: User can view his information and .
- **Admin Panel**: Accessible only to admin users.
- **Booking history**: Guests can view there booking history.
- **Redirection for Unauthenticated Users**: Users attempting to access protected routes are redirected to the login page.

### State Management and Security
- **JWT Storage**: JWT tokens are stored in `localStorage` for user session management.
- **API Interception**: Used Axios interceptors or middleware to attach tokens to API requests.
- **Frontend State Management**: Managed with `useState`, `useEffect` and `React Context`.

### Booking System
- **Booking Page**: Users can submit bookings, which are saved to the backend.
- **Reserved Bookings for Guests Page**: Displays reserved bookings for each user.
- **Reserved Bookings for Host Page**: Displays reserved bookings on Hosts Listings.

### Mini Admin Panel
- **Listings Management**: Form for adding new listings with property details and images, and list view for displaying and deleting existing listings.
- **Bookings Management**: Admin overview of all bookings with details for each booking, including user and property information.

### Backend Security
- **Role-Based Access Control**: Routes are protected based on user roles (e.g., admin).
- **JWT Middleware**: Secures routes that require authentication.
- **Password Hashing**: Passwords are hashed using bcrypt before being saved to the database.

### Responsive Design
- All pages and components are responsive on mobile and desktop.

### Styling and UX
- Consistent design with Tailwind CSS or CSS Modules.
- Toast notifications using framer motion are integrated.
- User feedback for actions like login success and booking confirmation.

## Tech Stack
- **Frontend**: React, Framer-motion, Axios
- **Backend**: Node.js, Express, MongoDB.
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS / CSS Modules
- **State Management**: React Context

## Installation Guide:

1. Clone the repository:
   ```bash
   git clone https://github.com/bazil-1854/BSCS22072_AirBnb_Client.git
   cd <where-you-cloned>
   ```

   
2. Install dependancies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
