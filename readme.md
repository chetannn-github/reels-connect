
# 📽️ ReelConnect – Instagram Reels Automation

![Hero Image](https://github.com/chetannn-github/reels-connect/main/web/src/assets/hero.png)
![Timeline Image](https://github.com/chetannn-github/reels-connect/main/web/src/assets/timeline.png)
![Hero Image](https://github.com/chetannn-github/reels-connect/main/web/src/assets/pricing.png)

**ReelConnect** is a full-stack application that helps creators automate interactions on their Instagram Reels. Users can connect their Instagram accounts, manage multiple reels, and set keyword-based triggers to send automated DMs to users who comment with specific keywords.  

This project solves the problem of manual engagement management for content creators, saving time and increasing audience interaction efficiently.

## ✅ Features

- 🔑 **User Authentication** – Signup and login with secure JWT-based authentication  
- 📲 **Instagram Account Linking** – Connect Instagram accounts via OAuth  
- 🎬 **Manage Multiple Reels** – Create, update, delete, and view reels  
- 🔑 **Keyword Automation** – Set keyword triggers per reel and automate DM responses  
- 🚦 **Activate/Deactivate Automations** – Control which reels are active  
- 🗑️ **Delete Reels and Keywords** – Easily manage content and automation rules  
- 🌐 **Frontend Interface** – User-friendly dashboard for managing reels and keywords  
- 📩 **Webhook Handling** – Listen to Instagram events and trigger actions in real-time

## 💻 Tech Stack

**Backend:**  
- ✅ **Express.js** – Flexible backend framework  
- ✅ **MongoDB Atlas** – Cloud-based NoSQL database  
- ✅ **ES Modules (`import/export`)** – Modern JavaScript structure  
- ✅ **JWT (JSON Web Tokens)** – Secure authentication  
- ✅ **Modular architecture** – Routes, controllers, middleware separated  
- ✅ **MVP structure** – Organized and scalable codebase  

**Frontend:**  
- ✅ **React.js** – Responsive UI and component-based architecture  
- ✅ **React Router** – Client-side routing  
- ✅ **Tailwind CSS** – Modern utility-first styling  
- ✅ **Axios** – API requests to backend  
- ✅ **State Management** – Using React context or hooks  
- ✅ **Responsive Design** – Works across devices  

## 📂 Project Structure

```
ReelConnect/
├── backend/
│   ├── config/          # Environment variables
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Authentication and request handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # State management
│   │   └── App.jsx      # Main React app
└── README.md            # Project documentation
```

## 🚀 How it Works

1. Users sign up or log in securely on the frontend.  
2. They link their Instagram account via OAuth.  
3. Users can create, manage, and delete reels on a dashboard.  
4. Each reel can have keywords assigned; matching comments trigger automated DMs via backend webhooks.  
5. Users can toggle automations on/off and update keywords/messages anytime.

## 📩 Contributing

Feel free to fork this repository, raise issues, or submit pull requests to improve functionality, security, or performance!  
