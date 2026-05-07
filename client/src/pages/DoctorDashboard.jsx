import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get('/appointments/doctor');
      setAppointments(data);
    } catch (err) {
      setError('Could not fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/appointments/status/${id}`, { status });
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
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Welcome, Dr. {user?.name}! 👨‍⚕️
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Patient Appointments
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading appointments...</p>
        ) : error ? (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">No appointments yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {appointments.map((apt) => (
              <div key={apt._id} className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Patient: {apt.patientId?.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {apt.patientId?.email}
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(apt._id, 'confirmed')}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(apt._id, 'cancelled')}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
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

export default DoctorDashboard;