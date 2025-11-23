import "./config/loadEnv.js";
import cors from "cors";
import express from "express";
import path from "path"; // to make common domain for both FE and BE in production. inbuild in nodejs

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT;
const __dirName = path.resolve(); // this will give the root directory of the project for BE

//middleware
app.use(express.json()); // this middleware allows us to parse JSON bodies

//CORS Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Adjust this to your frontend's origin
    })
  );
}

// Rate Limiter Middleware
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirName, "../FE/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirName, "../FE", "dist", "index.html"));
  });
}
// Production grade update - connect DB first and then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
