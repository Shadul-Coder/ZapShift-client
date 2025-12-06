# ZapShift - Parcel Delivery Web Application

## 📦 Overview
ZapShift is a full-featured parcel delivery web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform connects users, riders, and administrators in a seamless logistics ecosystem, facilitating parcel delivery services across Bangladesh.

# 🌐 Live Demo
- **Client:** [https://shadul-zapshift.netlify.app/](https://shadul-zapshift.netlify.app/)
- **Server:** [https://shadul-zap-shift-server.vercel.app/](https://shadul-zap-shift-server.vercel.app/)

### 🔐 Demo Access Credentials

#### **Admin Panel**
**Email:** shadulislam@gmail.com  
**Password:** Asdfg0

#### **Payment Testing (Stripe)**
For testing payments, use these test card details:

| Card Type | Card Number | Expiry Date | CVC |
|-----------|-------------|-------------|-----|
| **Visa** | `4242 4242 4242 4242` | Any future date | Any 3 digits |

**Test Mode Only:** All payments in this demo use Stripe's test environment. No real money will be charged.

*Note: These are demo accounts. Please use responsibly and do not modify sensitive system settings.*

## 🎯 Features

### 👤 User Features
- **User Registration & Authentication**: Secure signup/login system
- **Parcel Management**: Create, view, and track parcels
- **Payment Integration**: Secure payment processing for parcels
- **Rider Application**: Users can apply to become delivery riders
- **Real-time Tracking**: Track parcel delivery status
- **Dashboard**: Personalized dashboard with parcel history

### 🚴 Rider Features
- **Rider Dashboard**: Specialized interface for delivery personnel
- **Parcel Assignment**: View and accept/reject assigned parcels
- **Delivery Management**: Mark parcels as picked up/delivered
- **Earnings Tracking**: View delivered parcels and withdraw earnings
- **Performance History**: Access previous delivery records

### 👨‍💼 Admin Features
- **User Management**: Manage all users and their roles
- **Rider Approval**: Accept/reject rider applications
- **Admin Privileges**: Grant admin permissions to users
- **Parcel Assignment**: Assign paid parcels to available riders
- **System Oversight**: Comprehensive control panel

### 🗺️ Mapping Features
- **Warehouse Visualization**: Interactive map displaying all warehouses
- **District Coverage**: Covers all 64 districts of Bangladesh
- **Real-time Location**: Using Leaflet for map integration

## 🛠️ Tech Stack

### Frontend
- **React** (v19.2.0) - UI library
- **React Router** (v7.9.6) - Navigation
- **React Query** (v5.90.11) - State management
- **React Hook Form** (v7.66.1) - Form handling
- **Tailwind CSS** (v4.1.17) - Styling framework
- **DaisyUI** (v5.5.5) - Component library
- **Leaflet/React Leaflet** (v1.9.4/v5.0.0) - Maps
- **Recharts** (v3.5.1) - Data visualization
- **Swiper** (v12.0.3) - Touch sliders
- **SweetAlert2** (v11.26.3) - Alert notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Firebase** (v12.6.0) - Authentication
- **Stripe** (v20.0.0) - Payment processing

### Additional Tools
- **Axios** (v1.13.2) - HTTP client
- **Typewriter Effect** (v2.22.0) - Typing animations
- **React Fast Marquee** (v1.6.5) - Scrolling text

## 📁 Project Structure

```
zapshift-client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── contexts/      # React contexts
│   ├── utils/         # Utility functions
│   ├── assets/        # Static assets
│   └── styles/        # CSS/Tailwind styles
├── public/            # Public assets
└── package.json       # Dependencies
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

# Image Hosting
VITE_imgbbKey=your_imgbb_api_key

# Backend Server
VITE_server=your_backend_server_url
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Firebase account
- ImgBB account (for image hosting)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shadul-Coder/ZapShift-client.git
   cd ZapShift-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy the `.env.example` to `.env`
   - Fill in your Firebase and other API credentials

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Key Functionalities

### 1. User Registration & Authentication
- Email/password authentication via Firebase
- Role-based access control (user, rider, admin)
- Protected routes based on user roles

### 2. Parcel Delivery Flow
1. User creates a parcel delivery request
2. User makes payment via Stripe
3. Admin assigns parcel to available rider
4. Rider accepts/rejects assignment
5. Rider updates parcel status (picked up → in transit → delivered)
6. User tracks parcel in real-time

### 3. Payment System
- Secure payment processing with Stripe
- Multiple payment methods support
- Transaction history and receipts

### 4. Map Integration
- Interactive warehouse locations across Bangladesh
- District-wise filtering
- Real-time location tracking

## 🗃️ Database Schema

### Key Collections:
- **Users**: User profiles and authentication data
- **Parcels**: Parcel details and delivery information
- **Riders**: Rider-specific data and earnings
- **Payments**: Transaction records
- **Warehouses**: Location and capacity data

## 🔒 Security Features
- JWT-based authentication
- Role-based authorization
- Input validation and sanitization
- Secure payment processing
- Protected API endpoints

## 📊 Performance Optimizations
- React Query for efficient data fetching
- Code splitting and lazy loading
- Optimized images and assets
- Memoized components

## 👨‍💻 Developer

**Shadul Islam**
- GitHub: [@Shadul-Coder](https://github.com/Shadul-Coder)
- Project: [ZapShift Client](https://github.com/Shadul-Coder/ZapShift-client)
