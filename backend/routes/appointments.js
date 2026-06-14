const express = require("express");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");

const router = express.Router();

// ✅ Book an appointment
router.post("/", async (req, res) => {
  try {
    const { serviceId, customerName, customerPhone, date, time } = req.body;

    // Service exists check
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const newAppointment = new Appointment({
      serviceId,
      customerName,
      customerPhone,
      date,
      time
    });

    await newAppointment.save();
    res.json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("serviceId");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Cancel an appointment
router.put("/:id/cancel", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
