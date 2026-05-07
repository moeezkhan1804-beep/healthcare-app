import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const BookAppointment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    problem: ''
  });

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const { data } = await API.get(`/doctors/${id}`);
      setDoctor(data);
    } catch (err) {
      setError('Doctor not found');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await API.post('/appointments/book', {
        doctorId: id,
        ...formData
      });
      setSuccess('🎉 Appointment booked successfully!');
      setTimeout(() => navigate('/patient-dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">⏳</div>
        <p className="text-gray-500">Loading doctor info...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/doctors')}
            className="text-blue-200 hover:text-white text-sm mb-4 flex items-center gap-1 transition"
          >
            ← Back to Doctors
          </button>
          <h1 className="text-3xl font-bold">Book Appointment 📅</h1>
          <p className="text-blue-200 mt-1">Fill in the details to confirm your appointment</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Doctor Card */}
        {doctor && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-5 flex items-center gap-4">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                👨‍⚕️
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-xl">
                  Dr. {doctor.userId?.name}
                </p>
                <p className="text-blue-600 font-medium">
                  {doctor.specialization}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">₹{doctor.fees}</p>
                <p className="text-gray-500 text-sm">Consultation fee</p>
              </div>
            </div>
            <div className="px-6 py-4 flex gap-6">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                🎓 <span>{doctor.experience} years experience</span>
              </div>
              {doctor.address && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  📍 <span>{doctor.address}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Appointment Details
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
              <span>✅</span> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Select Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                required
              />
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ⏰ Select Time Slot
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({ ...formData, time })}
                    className={`py-2.5 rounded-xl text-sm font-medium transition ${
                      formData.time === time
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🩺 Describe your problem
              </label>
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                placeholder="Describe your symptoms or reason for visit..."
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
              />
            </div>

            {/* Summary */}
            {formData.date && formData.time && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 font-medium text-sm mb-2">
                  📋 Appointment Summary
                </p>
                <div className="flex gap-4 text-sm text-blue-700">
                  <span>📅 {formData.date}</span>
                  <span>⏰ {formData.time}</span>
                  <span>💰 ₹{doctor?.fees}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !formData.date || !formData.time}
              className="bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 font-semibold transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {submitting ? '⏳ Booking...' : '✅ Confirm Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;