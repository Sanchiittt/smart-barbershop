const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const serviceRoutes = require("./routes/services");
const appointmentRoutes = require("./routes/appointments");
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://dudemarky03_db_user:6SDaBtVRcQTWhYtx@cluster0.ar5hrg7.mongodb.net/")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/services", serviceRoutes);
app.use("/appointments",appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Barbershop API running...");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
