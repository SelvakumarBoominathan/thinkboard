import "./config/loadEnv.js";
import express from "express";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json()); // this middleware allows us to parse JSON bodies

// Rate Limiter Middleware
app.use(rateLimiter);

//custom middleware to check requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

// Production grade update - connect DB first and then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
