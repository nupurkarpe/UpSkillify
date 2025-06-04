# UpSkillify - Learning Management System
UpSkillify is a modern Learning Management System (LMS) built with the MERN stack, designed to help academies and institutions create, manage, and deliver online courses effectively.

## Features
- Instructor dashboard to create and manage courses
- Student dashboard with course enrollment and progress tracking
- Authentication for students and admins

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Shadcn/UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, bcrypt
- **State Management**: Redux Toolkit, redux-persist
- **Storage**: Cloudinary
- **Payment Gateway**: Stripe



##  Setup Instructions

**1. Clone the repository**

```bash
git clone https://github.com/nupurkarpe/upskillify.git
cd upskillify
```

**2. Install Dependencies**

```bash
# For server
cd server
npm install

# For client
cd ../client
npm install
```

**3. Environment Variables**

Create a .env file in the server directory and add the following variables:

```bash
#Mongodb setup
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

#Cloudinary Setup
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

#Stripe Setup
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
WEBHOOK_ENDPOINT_SECRET=your_stripe_webhook_secret
```

**4. Run the Application**
Start the Server:

```bash
cd server
npm run dev
```
Start the Client (in a new terminal):
```bash
cd client
npm start
```
