import "./config/loadEnv.js";
import cors from "cors";
import express from "express";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json()); // this middleware allows us to parse JSON bodies

//CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend's origin
  })
);

// Rate Limiter Middleware
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// Production grade update - connect DB first and then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
