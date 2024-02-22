// Importing necessary modules and libraries
import path from "path";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
// Importing middleware and database connection
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
// Importing route handlers
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { forgotPassword } from "./controllers/userController.js";
import { resetPassword } from "./controllers/userController.js";

// Load environment variables from a .env file
dotenv.config();

// Connect to the database
connectDB();

// Set up Express application
const app = express(); 

// Middleware for logging HTTP requests in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware to parse incoming JSON data
app.use(express.json()); //allow json data

app.get("/", (req, res) => {
  res.send("API is runningg...");
});

// Route handlers for various API endpoints
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Route for forgot password
app.post('/api/users/forgot-password', forgotPassword);

// Reset password route
app.put('/api/users/reset-password/:userId', resetPassword);

// Route to retrieve PayPal client ID from environment variables
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)  
);


// Route for khalti handling payment integration
app.post("/api/khalti", async (req, res) => {
  const payload = req.body;
  
  // Send a POST request to Khalti API for payment initiation
  const khaltiResponse = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        // Include authorization key in the request headers
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
  );

  // Check if Khalti response is successful
  if (khaltiResponse) {
    res.json({
      success: true,
      data: khaltiResponse?.data,
    });
  } else {  // Send a JSON response indicating failure
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
});

// Serve uploaded files statically using Express
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
console.log(__dirname);


// Middleware for handling 404 (Not Found) errors
app.use(notFound);
app.use(errorHandler); // Middleware for handling general errors

// Set up the port for the server to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
  )
);
