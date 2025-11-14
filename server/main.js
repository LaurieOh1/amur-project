import express from "express";
import dotenv from "dotenv";
import connectDB from "./libs/database.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";


import path from "path";

dotenv.config();

await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);




app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
