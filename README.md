![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=36BCF7FF&width=700&lines=🌍+ExplorEase+–+Your+Smart+Travel+Buddy;MERN+App+for+Modern+Travel+Planning)

# ExplorEase – Your Smart Travel Buddy

ExplorEase is a full-stack MERN travel application aimed at providing a seamless travel planning and hotel booking experience. The project is under active development, with core features working and more (including AI-powered tools) planned for future releases.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT, Cookies  
- **Payments:** Stripe / Razorpay (planned)  
- **State Management:** Context API / Redux (optional)  
- **Others:** Axios, dotenv, bcrypt, Cloudinary (for media), Lottie animations  
- **AI Integration:** (Planned) Chatbot/Smart Search

---

## 🚀 Features

**Implemented:**
- 🧭 Hotel exploration with filters (location, rating, price)
- 🔐 Secure user authentication (JWT-based login/signup)
- 📦 Hotel detail page with booking flow
- 📱 Responsive UI and basic animation
- 📤 Hotel image upload (Cloudinary)
- 🔍 Search functionality across listings

**Planned / In Scope:**
- 💳 Payment integration (Stripe / Razorpay)
- 🧾 Booking history & user dashboard
- 🛠️ Admin dashboard
- 🤖 AI-powered travel assistant/chatbot
- ✨ More UI animations and improvements

---

## 📸 Screenshots

_Add screenshots or a Loom demo link here_

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Stripe/Razorpay API keys (for payment features)

### Installation

```bash
# Clone the repo
git clone https://github.com/deepayandas/explorease.git
cd explorease

# Install backend dependencies
cd backend
npm install

# Set up environment variables
cp .env.example .env

# Start backend server
npm run dev

# In a new terminal, set up frontend
cd ../frontend
npm install
npm start
```

### Environment Variables

- Copy `.env.example` to `.env` in `/backend` and `/frontend` as needed.
- Fill in your own MongoDB URI, JWT secret, Stripe/Razorpay keys, Cloudinary credentials, etc.

---
ExploreEase/
├── client/               🖥️ React frontend (Vite, MUI, Axios)
│   ├── components/       🔧 Reusable UI components
│   ├── pages/            📄 App pages (Home, Login, Hotels, etc.)
│   ├── services/         🔌 API handling (Axios configs)
│   └── assets/           🖼️  Icons, images, Lottie animations
│
├── server/               ⚙️ Node + Express backend
│   ├── routes/           🌐 API endpoints (auth, flights, hotels, etc.)
│   ├── controllers/      🧠 Business logic and request handling
│   ├── models/           🗃️ Mongoose schemas for MongoDB
│   ├── middleware/       🛡️ Auth, error handling, validation
│   └── config/           🔧 DB connection, third-party keys
│
├── assets/               📁 Shared visuals for docs/UI
├── .env                  🔐 Environment variables (OpenAI, MongoDB, Stripe)
├── README.md             📘 Project documentation
└── package.json          📦 Dependency management


---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Check the [issues page](https://github.com/deepayandas/explorease/issues).

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Razorpay](https://razorpay.com/)
- [Cloudinary](https://cloudinary.com/)

---

> _“Travel is the only thing you buy that makes you richer.”_
