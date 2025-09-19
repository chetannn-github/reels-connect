# 📽️ ReelConnect – Instagram Reels Automation Backend

**ReelConnect** is a backend service that helps creators automate interactions on their Instagram reels. Users can connect their Instagram account, manage multiple reels, and set keyword-based triggers to send automated direct messages (DMs) to users who comment with specific keywords.

It’s built with scalability and modularity in mind using **Express.js**, **MongoDB Atlas**, and follows best practices with **ES Modules**, environment configuration management, and a clean folder structure.

## ✅ Features

- 🔑 **User Authentication** – Signup and login with secure JWT-based authentication  
- 📲 **Instagram Account Linking** – Users can connect their Instagram account via OAuth  
- 🎬 **Manage Multiple Reels** – Each account can manage multiple reels with CRUD operations  
- 🔑 **Keyword Automation** – Set keyword triggers per reel and automate responses via DMs  
- 🚦 **Activate/Deactivate Automations** – Control which reels are active at any time  
- 🗑️ **Delete Reels and Keywords** – Easily manage your content and automations  
- 📩 **Webhook Handling** – Listen to Instagram events and trigger actions in real-time

## 📂 Tech Stack

- ✅ **Express.js** – Lightweight, flexible backend framework  
- ✅ **MongoDB Atlas** – Cloud-based NoSQL database for storing user, reel, and keyword data  
- ✅ **ES Modules (`import/export`)** – Clean and modern JavaScript structure  
- ✅ **JWT (JSON Web Tokens)** – Secure user authentication  
- ✅ **dotenv with config file** – Centralized environment configuration  
- ✅ **Modular architecture** – Routes, controllers, and middleware separated for clarity  
- ✅ **MVP structure** – Organized and scalable codebase

## 📦 Project Structure Highlights

```
ReelConnect/
├── config/          # Centralized environment variables
├── controllers/     # Business logic for each feature
├── middlewares/      # Authentication and request handlers
├── models/          # Mongoose schemas for users, reels, keywords
├── routes/          # API endpoints
├── server.js        # Entry point
```

## 🚀 How it Works

1. Users sign up and log in securely.
2. They link their Instagram account using OAuth.
3. They can create and manage reels, assign keyword triggers, and control automation.
4. Comments matching keywords on reels trigger automated DMs via webhooks.
5. Users can manage and update automations easily.


## 📩 Contributing

Feel free to fork this repository, raise issues, or submit pull requests to improve functionality, security, or performance!

