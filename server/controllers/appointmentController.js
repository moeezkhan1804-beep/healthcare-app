const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Patient - Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, problem } = req.body;

    // Check if slot is already booked
    const existing = await Appointment.findOne({ 
      doctorId, 
      date, 
      time, 
      status: { $ne: 'cancelled' } 
    });
    if (existing) {
      return res.status(400).json({ message: 'This slot is already booked' });
    }

    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorId,
      date,
      time,
      problem
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Patient - Get my appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ 
      patientId: req.user.id 
    }).populate('doctorId').sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Patient - Cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, patientId: req.user.id },
      { status: 'cancelled' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment cancelled successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Doctor - Get appointments for my patients
exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    const appointments = await Appointment.find({ 
      doctorId: doctor._id 
    }).populate('patientId', 'name email').sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Doctor - Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Status updated successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin - Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name email')
      .populate('doctorId')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};