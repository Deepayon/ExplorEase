<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=25&pause=1000&center=true&vCenter=true&width=600&lines=ExploreEase+%7C+AI+All-in-One+Travel+Platform;Plan+Trips+Smartly+with+AI+Power!" alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-success?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Stripe-Payments-purple?style=for-the-badge&logo=stripe" />
</p>

---

# 🌍 ExploreEase – AI-Powered Travel Assistant

ExploreEase is a full-stack travel web app that helps users book flights & hotels, generate itineraries using OpenAI, make payments with Stripe, and interact with a real-time AI travel assistant.

---

## 🧠 Tech Stack

### 🎨 Frontend

| Tech         | Description                            |
|--------------|----------------------------------------|
| React 18+    | UI library (Vite-powered)              |
| Axios        | API communication                      |
| React Router | SPA routing                            |
| Material UI  | UI components                          |
| Tailwind CSS | Utility-first CSS (optional)           |
| Framer Motion| Animations                             |

### 🛠️ Backend

| Tech          | Description                               |
|---------------|-------------------------------------------|
| Node.js       | JavaScript runtime                        |
| Express.js    | Server framework                          |
| MongoDB       | NoSQL database                            |
| Mongoose      | MongoDB ORM                               |
| Passport.js   | User authentication (local strategy)      |
| CORS          | Cross-origin middleware                   |

### 🧠 AI Assistant

| Tech        | Description                                 |
|-------------|---------------------------------------------|
| OpenAI API  | GPT-based travel assistant & itinerary      |
| Route       | `POST /api/ai/chat` for OpenAI integration  |

### 💳 Payments

| Tech     | Description                          |
|----------|--------------------------------------|
| Stripe   | Payment gateway (Stripe Checkout)    |
| Stripe.js| Frontend integration for checkout UI |

---

## 📂 Project Structure

/client → React frontend
/server → Node + Express backend
└── /routes → API endpoints
└── /controllers → Logic handling
└── /models → MongoDB schemas
/assets → Media and UI assets
.env → Environment config

yaml
Copy
Edit

---

## 🖥️ Preview

<p align="center">
  <img src="https://github.com/Deepayon/ExplorEase/raw/main/assets/ui-preview.png" alt="UI Preview" width="800" />
</p>

---

## 🚀 Setup Instructions

### 🔧 Prerequisites

- Node.js ≥ 16
- MongoDB Atlas URI
- OpenAI API Key
- Stripe Secret Key

---

### 📥 Clone & Install

```bash
git clone https://github.com/Deepayon/ExplorEase.git
cd ExplorEase
Backend Setup (/server)
bash
Copy
Edit
cd server
npm install

# .env file example:
# MONGODB_URI=your_mongo_uri
# SESSION_SECRET=some_secret
# OPENAI_API_KEY=sk-XXXXXX
# STRIPE_SECRET_KEY=sk_test_XXXX
# CLIENT_URL=http://localhost:3000

npm run dev
Frontend Setup (/client)
bash
Copy
Edit
cd ../client
npm install
npm run dev
🌐 Key API Routes
Endpoint	Method	Description
/api/auth/signup	POST	User registration
/api/auth/login	POST	User login
/api/hotels/:id	GET	Fetch hotel details
/api/flights	GET	Search flights
/api/ai/chat	POST	Ask AI travel questions
/api/payment/checkout	POST	Stripe payment session

🧪 Sample .env File
env
Copy
Edit
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/exploreasedb
SESSION_SECRET=supersecretkey
OPENAI_API_KEY=sk-xxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxx
CLIENT_URL=http://localhost:3000
