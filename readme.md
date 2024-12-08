# 🌐 **Project Server Documentation**

## 🚀 **Overview**

This project is a server application built with **Node.js** and **Express**. It connects to a **MongoDB** database to manage:  
🎮 Reviews for games  
📜 A watchlist for games

The server provides endpoints to:

- 🛠️ Retrieve, add, update, and delete reviews
- 📋 Manage watchlist items

---

## 🛠️ **Technologies Used**

- **Node.js**: ⚡ JavaScript runtime for building the server.
- **Express**: 🛤️ Web framework to handle routing and middleware.
- **MongoDB**: 🗄️ NoSQL database for storing reviews and watchlist data.
- **CORS**: 🌍 Middleware to enable Cross-Origin Resource Sharing.

---

## ⚙️ **Installation**

### 1️⃣ Clone the repository:

```bash
git clone https://github.com/programming-hero-web-course2/b10-a10-server-side-MendiOP.git

2️⃣ Install dependencies:

npm install

3️⃣ Set up MongoDB connection:

Update your MongoDB connection string in the index.js file:

const uri = "mongodb+srv://<username>:<password>@cluster0.twtdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

4️⃣ Start the server:

npm start

💻 The server will run on http://localhost:5000 (or the port specified in the environment variable).
🔗 API Endpoints
🏠 Root Endpoint

    GET /
    📌 Description: Check if the server is running.
    ✅ Response: "Server is connected."

✍️ Reviews Endpoints

    GET /reviews
    📌 Description: Retrieve all reviews.
    📦 Response: Array of review objects.

    GET /reviews/:id
    📌 Description: Retrieve a single review by ID.
    📦 Response: Review object.

    POST /addReview
    📌 Description: Add a new review.
    📤 Request Body: Review object.
    📦 Response: Result of the insertion.

    GET /myReviews?email=<userEmail>
    📌 Description: Retrieve reviews for a specific user.
    📦 Response: Array of review objects.

    GET /updateReview/:id
    📌 Description: Retrieve a review for updating by ID.
    📦 Response: Review object.

    PUT /updateReview/:id
    📌 Description: Update a review by ID.
    📤 Request Body: Updated review object.
    📦 Response: Result of the update.

    DELETE /deleteReview/:id
    📌 Description: Delete a review by ID.
    📦 Response: Result of the deletion.

📋 Watchlist Endpoints

    GET /watchlist
    📌 Description: Retrieve all watchlist items.
    📦 Response: Array of watchlist objects.

    POST /watchlist
    📌 Description: Add a new game to the watchlist.
    📤 Request Body: Watchlist item object.
    ❌ Error: If the game is already in the watchlist.
    ✅ Response: Result of the insertion or error message.

🔧 Environment Variables

    PORT: Port number for the server (default is 5000).

👤 Author

🖋️ [Mehedi Hasan] (optional)
🙏 Acknowledgments

💖 Thanks to the AIs and libraries that made this project possible!
```
