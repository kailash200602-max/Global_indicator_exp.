# Global_indicator_exp.
# 🌍 Global Indicator Explorer

A production-ready full-stack web application for exploring and visualizing global development indicators using the **World Bank Open Data API**.

## 🚀 Tech Stack

* **Frontend:** React + Vite
* **Backend:** Node.js + Express.js
* **Database:** MongoDB
* **Authentication:** Firebase Authentication
* **Charts & Visualization:** D3.js
* **Styling:** Tailwind CSS v4


## ✨ Features

* 🌐 Browse real-world development indicators by country
* 📈 Interactive and animated charts powered by D3.js
* 🔐 Secure login/signup with Firebase Auth
* ⚡ Fast modern frontend with Vite
* 📦 REST API backend with Express
* ☁️ MongoDB data persistence
* 🎨 Clean responsive UI with Tailwind CSS

## 📂 Project Structure

```bash
Global-Indicator-Explorer/
├── client/   # React frontend
└── server/   # Express backend
```

## ⚙️ Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
FIREBASE_SERVICE_ACCOUNT_BASE64=base64_encoded_service_account_json
```

### Frontend (`client/.env`)

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/global-indicator-explorer.git
cd global-indicator-explorer
```

### 2️⃣ Start Backend

```bash
cd server
npm install
npm run dev
```

### 3️⃣ Start Frontend

```bash
cd client
npm install
npm run dev
```

## 📊 Data Source

Powered by the **World Bank Open Data API**.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

## 📄 License

MIT License

---

⭐ If you like this project, give it a star on GitHub!
