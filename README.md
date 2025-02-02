## StaySuite
**StaySuite** is a property rental platform similar offering key features such as user authentication, booking management, saving travelling history and favurite listings for guests while enabling  host to manange listings via dashboard and seamlessly handle  reservations made on there listings. It supports secure authentication using `JWT`, real-time updates for both guests and hosts with `Socket.io`, and image uploads of listings with `Multer`. Built with `Nuxt.js` for the frontend,` Nest.js `for the backend, and `MongoDB` for data storage, the platform ensures a seamless and efficient user experience.

</br>

[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](#)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat&label=Contributions&colorA=red&colorB=black	)](#)

### Project Description
This repository contains the frontend for the StaySuite property rental platform, built with Nuxt.js, Pinia Store, and VueUse Motion. It provides a responsive and dynamic user interface, ensuring a smooth experience for both guests and hosts.

Nuxt.js powers the application with its server-side rendering and seamless routing, while Pinia Store manages the state efficiently, providing a centralized store for all data across the app. VueUse Motion is used for creating engaging animations and smooth transitions, enhancing the user experience. This combination of technologies ensures high performance, maintainability, and an interactive, polished interface for users.



### 🤖 Tech Stack 
<a href="#"> 
<img alt="Vue.js" src="https://img.shields.io/badge/Vue.js-%234FC08D.svg?&style=for-the-badge&logo=Vue.js&logoColor=white"/>
<img alt="Nuxt.js" src="https://img.shields.io/badge/Nuxt.js-%238BCA4D.svg?&style=for-the-badge&logo=Nuxt.js&logoColor=white"/>

<img alt="Pinia Store" src="https://img.shields.io/badge/Pinia-%232E294D.svg?&style=for-the-badge&logo=Pinia&logoColor=white"/>
<img alt="VueUse Motion" src="https://img.shields.io/badge/VueUse_Motion-%234CAF50.svg?&style=for-the-badge&logo=Vue.js&logoColor=white"/>

<img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO%20-%23010101.svg?&style=for-the-badge&logo=socket.io&logoColor=white"/>
 </a>

---
- Check out the latest demo of Project [StaySuite-Site](https://collabora8r.vercel.app/). 
- Find the Client Repository of this Project Here [StaySuite-Server](https://github.com/BazilSuhail/StaySuite-Server). 
---

### Run Locally
Clone the project using the following command:
```bash
   git clone https://github.com/BazilSuhail/StaySuite-Client.git
```
Go to the project directory
```bash
   cd StaySuite-Client
```
Then **Run** this command in your terminal to install all required dependancies:
```bash
   npm install
```
In the project directory, you can run:
```bash
   npm run dev
``` 
Runs the app in the development mode. Your server will be running at port 3001, 
Open [http://localhost:3000](http://localhost:3000) or also you can modify it in the **.env** file.

---

## Project Structure

### Frontend
- **Pages**: Contains all the pages (e.g., login, signup, listings, bookings).
- **Components**: Reusable UI components (e.g., forms, modals, cards).
- **Store**: Pinia store for state management (e.g., user his notificaitions).
- **Plugins**: Plugin to setup Pinia Store in client enviornment only.
- **Composables**: Reusable functions across all components (e.g., isLoggedIn (checking whether user is logged in or not) ).
- **Assets**: Include all assets for the project (e.g. logos, 2d-illustrations).

---

### Features

#### User Authentication
- **Signup Page**: A registration form for new users.
- **Login Page**: A login form for existing users.
- **JWT Authentication**: Secure user sessions with JSON Web Tokens stored in `localStorage`.
- **Protected Routes**: Redirect unauthenticated users to the login page when accessing protected routes.

#### Admin Panel
- **Listings Management**: Admins can view, add, and remove property listings.
- **Bookings Management**: Admins can view all bookings, including user and property details.

#### Guest Features
- **Booking System**: Guests can submit bookings, which are saved to the backend.
- **Booking History**: Guests can view their booking history.
- **Favourite Listings**: Guests can save their favourite listings for quick access.

#### Host Features
- **Listings Dashboard**: Hosts can manage their listings, including adding, updating, and removing properties.
- **Reservations Dashboard**: Hosts can view and manage reservations made on their listings.

#######Real-Time Updates
- **Socket.io Integration**: Real-time updates for bookings and reservations for both guests and hosts.

#### State Management
- **Pinia Store**: Centralized state management for efficient data handling across the app.

#### Animations and Transitions
- **VueUse Motion**: Engaging animations and smooth transitions for an enhanced user experience.

#### Backend Security
- **Role-Based Access Control**: Routes are protected based on user roles (e.g., admin, host, guest).
- **JWT Middleware**: Secures routes that require authentication.
- **Password Hashing**: Passwords are hashed using `bcrypt` before being saved to the database.

#### Responsive Design
- Fully responsive design for both mobile and desktop devices.

#### Styling and UX
- Consistent design with **Tailwind CSS**.
- Toast notifications for user feedback (e.g., login success, booking confirmation). 
 ---
### Frontend
- **Nuxt.js**: Server-side rendering and seamless routing.
- **Pinia Store**: Centralized state management.
- **VueUse Motion**: Animations and transitions.
- **Tailwind CSS**: Styling and responsive design.
- **Socket.io**: Real-time updates for bookings and reservations.

### Backend
- **Nest.js**: Robust and scalable backend framework.
- **MongoDB**: Database for storing listings, bookings, and user data.
- **Multer**: Handling image uploads for listings.
- **JWT**: Secure authentication and session management.
- **Bcrypt**: Password hashing for enhanced security.
