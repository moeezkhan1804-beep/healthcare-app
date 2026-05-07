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
      setSuccess('Appointment booked successfully!');
      setTimeout(() => navigate('/patient-dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Book Appointment 📅
        </h1>

        {/* Doctor Info */}
        {doctor && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center text-2xl">
                👨‍⚕️
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg">
                  Dr. {doctor.userId?.name}
                </p>
                <p className="text-blue-600 text-sm">
                  {doctor.specialization}
                </p>
                <p className="text-gray-600 text-sm">
                  💰 Fees: ₹{doctor.fees}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Describe your problem
              </label>
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                placeholder="Describe your symptoms or reason for visit..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              {submitting ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;