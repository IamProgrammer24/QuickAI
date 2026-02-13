import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./Routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./Routes/userRoutes.js";

const app = express();

await connectCloudinary();

await connectDB();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server is Live"));

// app.use(requireAuth());

app.use("/api/ai", aiRouter);
app.use('/api/user',userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
