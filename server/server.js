const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // 👈 IMPORTANT

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Use PORT from .env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});