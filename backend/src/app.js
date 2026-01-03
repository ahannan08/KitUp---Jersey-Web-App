import express from "express";
import cors from "cors";
import { connectDB } from "../config/db.js";
import { ENV } from "../config/env.js";

// Initialize Express app
const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// CORS
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// DATABASE CONNECTION
// ============================================

connectDB();

// ============================================
// ROUTES
// ============================================

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/users.routes.js";
import productRoutes from "../modules/products/products.routes.js";
import cartRoutes from "../modules/cart/cart.routes.js";
import wishlistRoutes from "../modules/wishlist/wishlist.routes.js";
// import orderRoutes from "./modules/orders/order.route.js";
// import paymentRoutes from "./modules/payments/payment.route.js";

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/wishlists", wishlistRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payments", paymentRoutes);

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  console.error(`[ERROR] ${status} - ${message}`);

  res.status(status).json({
    success: false,
    message,
    ...(ENV.NODE_ENV === "development" && { error: err.stack }),
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🚀 Jersey Store API Server 🚀      ║
╚════════════════════════════════════════╝

📍 Server running on: http://localhost:${PORT}
📊 Environment: ${ENV.NODE_ENV}
🗄️  Database: ${ENV.MONGODB_URI.split("@")[1] || "Local MongoDB"}
✅ Ready to handle requests!
  `);
});

export default app;