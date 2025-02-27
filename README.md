# Restaurant Management Website
Live Server: https://restaurant-server-coral.vercel.app

Live Client: https://restaurant-management-4320e.web.app

## Overview
This is a full-stack restaurant management web application that allows users to manage food items, place orders, and access various features like SweetAlert notifications and a dark mode toggle.

## Features
- User authentication with **Firebase**
- Add and manage food items
- Place and track orders
- Secure authentication using **JSON Web Token (JWT)**
- Interactive alerts with **SweetAlert**
- Dark mode toggle
- Responsive UI with **Tailwind CSS**
- **React Router** for navigation

## Tech Stack
### Client-side:
- React.js
- React Router
- Tailwind CSS
- Firebase Authentication
- SweetAlert

### Server-side:
- Express.js
- JSON Web Token (JWT)
- MongoDB (Database)
- Cors & Cookie Parser

## Installation
### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB (or use MongoDB Atlas)

### Clone the Repository
```sh
git clone https://github.com/your-username/restaurant-management.git
cd restaurant-management
```

### Setting Up the Client
```bash
cd client
npm install
npm run dev
```

### Setting Up the Server
```bash
cd server
npm install
```
Create a .env file in the server directory and add:
```bash
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET_KEY=your_secret_key
```

Then, start the server:
```bash
npm start
```