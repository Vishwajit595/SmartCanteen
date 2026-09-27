# SmartCanteen 🍽️

SmartCanteen is a web-based college canteen management and food ordering system developed using the MEAN Stack.

It allows students to browse the canteen menu, add food items to their cart, place orders, select pickup times, and track order status. Staff members can manage student orders, while administrators can manage staff accounts and menu items.

## 🚀 Live Demo

Frontend:
https://smartcanteen-frontend-7vie.onrender.com

Backend:
https://smartcanteen-c012.onrender.com

## 🛠️ Technologies Used

### Frontend
- Angular
- HTML
- CSS
- TypeScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication & Security
- JWT Authentication
- bcrypt Password Hashing
- Role-Based Access Control
- Email Verification

### Email Service
- Brevo API

### Deployment
- Render
- GitHub

## 👥 User Roles

### Student
- Register account
- Verify email
- Login
- View menu
- Add items to cart
- Place orders
- Select pickup time
- View order history
- Track order status

### Staff
- Login through staff account
- View student orders
- Accept orders
- Start preparing orders
- Mark orders as ready
- Mark orders as collected
- Reject pending orders

### Admin
- Login through admin account
- Create staff accounts
- View staff list
- Add menu items
- Edit menu items
- Delete menu items
- Change item availability

## 🔄 Order Status Flow

Pending → Accepted → Preparing → Ready → Collected

If a pending order is rejected:

Pending → Cancelled

## 📁 Project Structure

```text
SmartCanteen/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   └── app/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md