import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get('/appointments/my');
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await API.put(`/appointments/cancel/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-600';
    if (status === 'cancelled') return 'bg-red-100 text-red-600';
    return 'bg-yellow-100 text-yellow-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.name}! 👋
          </h1>
          <Link
            to="/doctors"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Book Appointment
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          My Appointments
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">No appointments yet</p>
            <Link
              to="/doctors"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Book your first appointment
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {appointments.map((apt) => (
              <div key={apt._id} className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Dr. {apt.doctorId?.userId?.name || 'Doctor'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {apt.doctorId?.specialization}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      📅 {apt.date} at ⏰ {apt.time}
                    </p>
                    {apt.problem && (
                      <p className="text-gray-500 text-sm mt-1">
                        Problem: {apt.problem}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                    {apt.status === 'pending' && (
                      <button
                        onClick={() => handleCancel(apt._id)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;