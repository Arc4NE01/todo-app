import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoute.js";

dotenv.config();

connectDB();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);

app.post("/add", (req, res) => {
  const task = req.body.task;
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
