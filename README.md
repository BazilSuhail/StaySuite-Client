## StaySuite's Server
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

### Features

#### User Authentication
- **Signup Page**: A registration form for new users.
- **Login Page**: A login form for existing users.

#### Admin Panel
- **Listings Management**: Admin can view, add, and remove property listings.
- **Bookings Management**: Admin can view all bookings, including user and property details.

#### Protected Routes
- **User Profile**: User can view his information and .
- **Admin Panel**: Accessible only to admin users.
- **Booking history**: Guests can view there booking history.
- **Redirection for Unauthenticated Users**: Users attempting to access protected routes are redirected to the login page.

#### State Management and Security
- **JWT Storage**: JWT tokens are stored in `localStorage` for user session management.
- **API Interception**: Used Axios interceptors or middleware to attach tokens to API requests.
- **Frontend State Management**: Managed with `useState`, `useEffect` and `React Context`.

#### Booking System
- **Booking Page**: Users can submit bookings, which are saved to the backend.
- **Reserved Bookings for Guests Page**: Displays reserved bookings for each user.
- **Reserved Bookings for Host Page**: Displays reserved bookings on Hosts Listings.

#### Mini Admin Panel
- **Listings Management**: Form for adding new listings with property details and images, and list view for displaying and deleting existing listings.
- **Bookings Management**: Admin overview of all bookings with details for each booking, including user and property information.

#### Backend Security
- **Role-Based Access Control**: Routes are protected based on user roles (e.g., admin).
- **JWT Middleware**: Secures routes that require authentication.
- **Password Hashing**: Passwords are hashed using bcrypt before being saved to the database.

#### Responsive Design
- All pages and components are responsive on mobile and desktop.

#### Styling and UX
- Consistent design with Tailwind CSS or CSS Modules.
- Toast notifications using framer motion are integrated.
- User feedback for actions like login success and booking confirmation.
