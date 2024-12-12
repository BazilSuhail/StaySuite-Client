# Airbnb Clone

This project is a basic Airbnb clone, featuring user authentication, booking management, and an admin panel for managing listings and bookings. Built with Next.js, MongoDB, and Redis, this project demonstrates core functionality needed for an online property rental platform.

## Features

### User Authentication
- **Signup Page**: A registration form for new users.
- **Login Page**: A login form for existing users.

### Admin Panel
- **Listings Management**: Admin can view, add, and remove property listings.
- **Bookings Management**: Admin can view all bookings, including user and property details.

### Protected Routes
- **User Profile**: View user information and booking history.
- **Admin Panel**: Accessible only to admin users.
- **Redirection for Unauthenticated Users**: Users attempting to access protected routes are redirected to the login page.

### State Management and Security
- **JWT Storage**: JWT tokens are stored in `localStorage` or `sessionStorage` for user session management.
- **API Interception**: Using Axios interceptors or middleware to attach tokens to API requests.
- **Frontend State Management**: Managed with `useState`, `useEffect`, and optionally `React Context` or `Redux`.

### Booking System
- **Booking Page**: Users can submit bookings, which are saved to the backend.
- **Profile Page**: Displays past bookings for each user.

### Mini Admin Panel
- **Listings Management**: Form for adding new listings with property details and images, and list view for displaying and deleting existing listings.
- **Bookings Management**: Admin overview of all bookings with details for each booking, including user and property information.

### Backend Security
- **Role-Based Access Control**: Routes are protected based on user roles (e.g., admin).
- **JWT Middleware**: Secures routes that require authentication.
- **Password Hashing**: Passwords are hashed using bcrypt before being saved to the database.

### Responsive Design
- Ensures all pages and components are responsive on mobile and desktop.

### Styling and UX
- Consistent design with Tailwind CSS or CSS Modules.
- User feedback for actions like login success and booking confirmation.

## Tech Stack
- **Frontend**: Next.js, React, Axios
- **Backend**: Node.js, Express, MongoDB, Redis
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS / CSS Modules
- **State Management**: React Context / Redux (optional)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/airbnb-clone.git
   cd airbnb-clone
