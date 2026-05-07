import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const DoctorProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const { data } = await API.get(`/doctors/${id}`);
      setDoctor(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/book/${id}`);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">⏳</div>
        <p className="text-gray-500">Loading doctor profile...</p>
      </div>
    </div>
  );

  if (!doctor) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">❌</div>
        <p className="text-gray-500">Doctor not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/doctors')}
            className="text-blue-200 hover:text-white text-sm mb-6 flex items-center gap-1 transition"
          >
            ← Back to Doctors
          </button>
          <div className="flex items-center gap-6">
            <div className="bg-white/20 backdrop-blur w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-lg">
              👨‍⚕️
            </div>
            <div>
              <h1 className="text-3xl font-bold">{doctor.userId?.name}</h1>
              <p className="text-blue-200 text-lg mt-1">{doctor.specialization}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="bg-green-400 text-white text-xs px-3 py-1 rounded-full font-medium">
                  ✓ Verified
                </span>
                <span className="text-blue-200 text-sm">
                  🎓 {doctor.experience} years experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* About */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                About Doctor
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {doctor.userId?.name} is a highly experienced {doctor.specialization} with over {doctor.experience} years of practice. 
                Specializing in diagnosing and treating patients with dedication and care. 
                Known for a patient-first approach and excellent bedside manner.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-blue-600 font-bold text-2xl">{doctor.experience}+</p>
                  <p className="text-gray-500 text-sm">Years Experience</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-green-600 font-bold text-2xl">500+</p>
                  <p className="text-gray-500 text-sm">Patients Treated</p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📅 Available Days
              </h2>
              <div className="flex flex-wrap gap-2">
                {doctor.availableSlots?.map((slot, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-center"
                  >
                    <p className="text-blue-700 font-semibold text-sm">{slot.day}</p>
                    <p className="text-blue-500 text-xs mt-1">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📍 Location
              </h2>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="bg-red-100 w-10 h-10 rounded-xl flex items-center justify-center text-xl">
                  📍
                </div>
                <p>{doctor.address || 'Address not available'}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600 mt-3">
                <div className="bg-green-100 w-10 h-10 rounded-xl flex items-center justify-center text-xl">
                  📞
                </div>
                <p>{doctor.phone || 'Phone not available'}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">

            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Book Appointment
              </h2>
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Consultation Fee</span>
                  <span className="font-bold text-gray-800 text-lg">₹{doctor.fees}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Experience</span>
                  <span className="font-semibold text-gray-800">{doctor.experience} years</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Specialization</span>
                  <span className="font-semibold text-blue-600">{doctor.specialization}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                    ✓ Available
                  </span>
                </div>
              </div>
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition font-bold text-lg shadow-sm"
              >
                Book Appointment →
              </button>
              <p className="text-center text-gray-400 text-xs mt-3">
                Free cancellation available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;