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

  const getStatusStyle = (status) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-700 border border-green-200';
    if (status === 'cancelled') return 'bg-red-100 text-red-700 border border-red-200';
    return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
  };

  const getStatusIcon = (status) => {
    if (status === 'confirmed') return '✅';
    if (status === 'cancelled') return '❌';
    return '⏳';
  };

  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-200 text-sm mb-1">Welcome back 👋</p>
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="text-blue-200 mt-1">Patient Dashboard</p>
            </div>
            <Link
              to="/doctors"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow-sm"
            >
              + Book Appointment
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{totalAppointments}</p>
              <p className="text-blue-200 text-sm mt-1">Total</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{confirmedAppointments}</p>
              <p className="text-blue-200 text-sm mt-1">Confirmed</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{pendingAppointments}</p>
              <p className="text-blue-200 text-sm mt-1">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          My Appointments
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-5xl mb-4">⏳</div>
              <p className="text-gray-500">Loading appointments...</p>
            </div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No appointments yet
            </h3>
            <p className="text-gray-500 mb-6">
              Book your first appointment with one of our expert doctors
            </p>
            <Link
              to="/doctors"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition inline-block"
            >
              Find a Doctor
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {appointments.map((apt) => (
              <div
                key={apt._id}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">
                      👨‍⚕️
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">
                        Dr. {apt.doctorId?.userId?.name || 'Doctor'}
                      </p>
                      <p className="text-blue-600 text-sm font-medium">
                        {apt.doctorId?.specialization}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          📅 {apt.date}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          ⏰ {apt.time}
                        </span>
                      </div>
                      {apt.problem && (
                        <p className="text-gray-400 text-sm mt-1">
                          🩺 {apt.problem}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusStyle(apt.status)}`}>
                      {getStatusIcon(apt.status)} {apt.status}
                    </span>
                    {apt.status === 'pending' && (
                      <button
                        onClick={() => handleCancel(apt._id)}
                        className="text-red-500 text-sm hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition"
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