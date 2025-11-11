import "./config/loadEnv.js"; 
import express from "express";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(express.json());
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
