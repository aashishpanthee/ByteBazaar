import colors from "colors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import orderRoute from "./routes/orderRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
dotenv.config();
const port = process.env.PORT || 5001;

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
connectDB(); //Connection to MONGODB

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`Server is ready`);
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(notFound); //  any request that does not match a defined route will be handled by the notFound middleware,
app.use(errorHandler); // This middleware is responsible for handling errors that occur during the processing of a request or in any previous middleware.
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`.bgGreen.black);
});
