import express from "express";
import dotenv from "dotenv";

import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
