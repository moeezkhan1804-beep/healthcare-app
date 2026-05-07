const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Doctor = require('./models/Doctor');

const doctors = [
  {
    name: 'Dr. Arjun Mehta',
    email: 'arjun@doctor.com',
    specialization: 'Neurologist',
    experience: 8,
    fees: 800,
    phone: '9876543211',
    address: 'Apollo Hospital, Bangalore'
  },
  {
    name: 'Dr. Priya Sharma',
    email: 'priya@doctor.com',
    specialization: 'Dermatologist',
    experience: 6,
    fees: 600,
    phone: '9876543212',
    address: 'Fortis Hospital, Bangalore'
  },
  {
    name: 'Dr. Rahul Gupta',
    email: 'rahul@doctor.com',
    specialization: 'Orthopedic',
    experience: 10,
    fees: 900,
    phone: '9876543213',
    address: 'Manipal Hospital, Bangalore'
  },
  {
    name: 'Dr. Anjali Singh',
    email: 'anjali@doctor.com',
    specialization: 'Pediatrician',
    experience: 7,
    fees: 700,
    phone: '9876543214',
    address: 'Narayana Health, Bangalore'
  },
  {
    name: 'Dr. Vikram Patel',
    email: 'vikram@doctor.com',
    specialization: 'Ophthalmologist',
    experience: 9,
    fees: 750,
    phone: '9876543215',
    address: 'Sankara Eye Hospital, Bangalore'
  },
  {
    name: 'Dr. Sneha Reddy',
    email: 'sneha@doctor.com',
    specialization: 'Gynecologist',
    experience: 11,
    fees: 850,
    phone: '9876543216',
    address: 'Columbia Asia, Bangalore'
  },
  {
    name: 'Dr. Kiran Kumar',
    email: 'kiran@doctor.com',
    specialization: 'Psychiatrist',
    experience: 5,
    fees: 1000,
    phone: '9876543217',
    address: 'NIMHANS, Bangalore'
  },
  {
    name: 'Dr. Meera Nair',
    email: 'meera@doctor.com',
    specialization: 'Dentist',
    experience: 4,
    fees: 500,
    phone: '9876543218',
    address: 'Dental World, Bangalore'
  },
  {
    name: 'Dr. Suresh Babu',
    email: 'suresh@doctor.com',
    specialization: 'General Physician',
    experience: 15,
    fees: 400,
    phone: '9876543219',
    address: 'City Clinic, Bangalore'
  },
  {
    name: 'Dr. Kavitha Rao',
    email: 'kavitha@doctor.com',
    specialization: 'Endocrinologist',
    experience: 12,
    fees: 950,
    phone: '9876543220',
    address: 'Cloudnine Hospital, Bangalore'
  }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    for (const doc of doctors) {
      // Check if user already exists
      const existing = await User.findOne({ email: doc.email });
      if (existing) {
        console.log(`Skipping ${doc.name} — already exists`);
        continue;
      }

      // Create user
      const hashedPassword = await bcrypt.hash('doctor123', 10);
      const user = await User.create({
        name: doc.name,
        email: doc.email,
        password: hashedPassword,
        role: 'doctor'
      });

      // Create doctor profile
      await Doctor.create({
        userId: user._id,
        specialization: doc.specialization,
        experience: doc.experience,
        fees: doc.fees,
        phone: doc.phone,
        address: doc.address,
        approved: true,
        availableSlots: [
          { day: 'Monday', startTime: '09:00', endTime: '17:00' },
          { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
          { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
          { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
          { day: 'Friday', startTime: '09:00', endTime: '17:00' }
        ]
      });

      console.log(`✅ Added ${doc.name} — ${doc.specialization}`);
    }

    console.log('🎉 All doctors added successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

seedDoctors();