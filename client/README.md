🛒 Add-to-Cart Project — Full Stack E-Commerce Demo

A simple full-stack shopping cart app built for the Vibe Commerce Internship Screening Assignment.
It implements a React (Vite) frontend, Express.js backend, and MongoDB database.
The app demonstrates full CRUD cart functionality with a responsive UI and mock checkout.

🚀 Live Demo

Frontend (Vercel): https://add-to-cart-project-sandy.vercel.app/

Backend (Render): https://add-to-cart-project.onrender.com


📦 Tech Stack
Layer	Technology
Frontend	React + Vite + TypeScript + TailwindCSS + ShadCN UI
State & API	TanStack Query (React Query)
Backend	Node.js + Express.js
Database	MongoDB Atlas + Mongoose
API Requests	Fetch API
Deployment	Render (Backend), Vercel (Frontend)


⚙️ Features Implemented
✅ Backend (Express + MongoDB)

GET /api/products → Fetch mock product list (from DummyJSON API or MongoDB)

POST /api/cart → Add product to cart { userId, productId, quantity }

GET /api/cart?userId={id} → Get all cart items + total price

DELETE /api/cart/:id → Remove a specific item

POST /api/cart/checkout → Mock checkout → returns a receipt (total, timestamp)


✅ Frontend (React + Vite)

Products Grid: Displays products fetched from backend (pagination, sorting, filtering)

Product Details Page: Click any product → navigate to /dashboard/product/:id

Add to Cart: Adds selected product, updates quantity dynamically

Cart Page: View cart, remove items, apply promo code, see subtotal & total

Checkout Modal: Collects name, email, phone → shows success toast

Responsive Dashboard Layout: Shared sidebar & header across all pages


⚡ Local Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/Add-to-Cart-Project.git
cd Add-to-Cart-Project

2️⃣ Setup Backend
cd backend
npm install


Create .env file inside /backend:

MONGO_URI=your_mongodb_connection_string
PORT=3000


Start backend:

npm run dev


➡ Runs at: http://localhost:3000

3️⃣ Setup Frontend
cd ../client
npm install


Create .env inside /client:

VITE_API_BASE_URL=http://localhost:3000


Start frontend:

npm run dev