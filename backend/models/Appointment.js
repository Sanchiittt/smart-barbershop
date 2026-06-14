const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Service", 
    required: true 
  },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  date: { type: String, required: true },  // e.g. "2025-09-27"
  time: { type: String, required: true },  // e.g. "3:30 PM"
  status: { type: String, default: "Booked" } // Booked / Cancelled / Completed
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
