# ByteBazaar

A full-stack e-commerce application built with the **MERN stack** (MongoDB, Express, React, Node.js). ByteBazaar is a modern shopping platform that allows users to browse products, add items to their cart, and complete purchases with PayPal integration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Key Components](#key-components)
- [Author](#author)

## ✨ Features

### User Features

- **User Authentication**: Register, login, and logout functionality with JWT tokens
- **Product Browsing**: View all products with detailed information
- **Product Ratings & Reviews**: Users can rate and review products
- **Shopping Cart**: Add/remove items from cart with persistent storage
- **Checkout Process**: Multi-step checkout with shipping and payment information
- **Order Management**: View order history and order details
- **User Profile**: Update personal information and view order history
- **PayPal Integration**: Secure payment processing via PayPal

### Admin Features

- **Product Management**: Create, update, and delete products
- **Order Management**: View all orders and update order status
- **User Management**: View all users and manage user roles
- **Admin Dashboard**: Access to admin-specific screens and controls

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cookie-parser** - Cookie parsing middleware
- **dotenv** - Environment variable management

### Frontend

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **React Bootstrap** - UI component library
- **Axios** - HTTP client
- **PayPal SDK** - Payment integration
- **React Toastify** - Toast notifications
- **React Icons** - Icon library

## 📁 Project Structure

```
ByteBazaar/
├── backend/
│   ├── config/          # Database configuration
│   ├── controller/      # Route controllers (business logic)
│   ├── data/           # Sample data for seeding
│   ├── middleware/     # Express middleware (auth, error handling)
│   ├── models/         # Mongoose schemas (User, Product, Order)
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── server.js       # Express server entry point
│   ├── seeder.js       # Database seeding script
│   └── package.json
│
└── frontend/
    ├── public/         # Static assets
    ├── src/
    │   ├── components/ # Reusable React components
    │   ├── screens/    # Page components
    │   ├── slices/     # Redux slices (state management)
    │   ├── utils/      # Utility functions
    │   ├── assets/     # Images and styles
    │   ├── App.js      # Main App component
    │   ├── store.js    # Redux store configuration
    │   └── index.js    # React entry point
    └── package.json
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v14+) and npm
- **MongoDB** (local or Atlas connection)

### Clone Repository

```bash
git clone https://github.com/aashishpanthee/ByteBazaar.git
cd ByteBazaar
```

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `/backend` directory with the following variables:

```env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bytebazaar
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
NODE_ENV=development
```

### Frontend Configuration

The frontend is configured to proxy API requests to `http://localhost:5001` (defined in `package.json`).

## 📝 Running the Application

### Development Mode (Both Backend & Frontend)

From the root directory:

```bash
npm run dev
```

This will start both the Node.js server and React development server concurrently.

### Backend Only

```bash
cd backend
npm run server
```

The server will run on `http://localhost:5001`

### Frontend Only

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

### Populate Database with Sample Data

```bash
cd backend
npm run data:import
```

### Clear Database

```bash
cd backend
npm run data:destroy
```

## 🔌 API Routes

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order payment status
- `GET /api/orders/:id/deliver` - Mark order as delivered (Admin)

## 📊 Database Models

### User Model

- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `isAdmin` - Administrator flag
- Timestamps (createdAt, updatedAt)

### Product Model

- `name` - Product name
- `image` - Product image URL
- `brand` - Brand name
- `category` - Product category
- `description` - Product description
- `price` - Product price
- `countInStock` - Inventory count
- `rating` - Average rating
- `reviews` - Array of review objects with user, rating, and comment
- Timestamps (createdAt, updatedAt)

### Order Model

- `user` - Reference to User
- `orderItems` - Array of items with product details
- `shippingAddress` - Address, city, postal code, country
- `paymentMethod` - Payment method used
- `paymentResult` - PayPal transaction details
- `itemsPrice`, `taxPrice`, `shippingPrice`, `totalPrice` - Pricing details
- `isPaid`, `isDelivered` - Status flags
- Timestamps (createdAt, updatedAt, paidAt, deliveredAt)

## 🎨 Key Components

### Frontend Components

- **Header** - Navigation bar with search and user menu
- **Footer** - Footer section
- **Product** - Product card display
- **Rating** - Star rating component
- **Message** - Alert/message display
- **Loader** - Loading spinner
- **CheckoutSteps** - Multi-step checkout progress indicator
- **FormContainer** - Centered form wrapper
- **PrivateRoute** - Protected route for authenticated users
- **AdminRoute** - Protected route for admin users

### Frontend Screens

- **HomeScreen** - Product listing
- **ProductScreen** - Product details with reviews
- **CartScreen** - Shopping cart
- **LoginScreen** - User login
- **RegisterScreen** - User registration
- **ShippingScreen** - Shipping address form
- **PaymentScreen** - Payment method selection
- **PlaceOrderScreen** - Order review and confirmation
- **OrderScreen** - Order details and tracking
- **ProfileScreen** - User profile management
- **AdminScreens** - Product and order management for admins

### Middleware

- **asyncHandler** - Async error handling wrapper
- **authMiddleware** - JWT authentication and authorization
- **errorMiddleware** - Global error handling

## 👤 Author

**Aashish Panthee**

- GitHub: [@aashishpanthee](https://github.com/aashishpanthee)

## 📄 License

ISC

---

**Built with ❤️ using MERN Stack**
