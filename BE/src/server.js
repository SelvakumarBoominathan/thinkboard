import "./config/loadEnv.js";
import express from "express";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT;
connectDB();

//middleware
app.use(express.json());


//custom middleware to check requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
