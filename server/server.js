import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoute.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
