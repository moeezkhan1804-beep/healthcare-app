import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

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

  const filteredAppointments = appointments.filter(apt => {
    if (activeTab === 'all') return true;
    return apt.status === activeTab;
  });

  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-200 text-sm mb-1">Welcome back 👋</p>
              <h1 className="text-3xl font-bold">Dr. {user?.name}</h1>
              <p className="text-blue-200 mt-1">Doctor Dashboard</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-3 text-center">
              <p className="text-2xl font-bold">{totalAppointments}</p>
              <p className="text-blue-200 text-sm">Total Patients</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{pendingAppointments}</p>
              <p className="text-blue-200 text-sm mt-1">⏳ Pending</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{confirmedAppointments}</p>
              <p className="text-blue-200 text-sm mt-1">✅ Confirmed</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{cancelledAppointments}</p>
              <p className="text-blue-200 text-sm mt-1">❌ Cancelled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-2xl shadow-sm w-fit">
          {['all', 'pending', 'confirmed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-5xl mb-4">⏳</div>
              <p className="text-gray-500">Loading appointments...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500">
              No {activeTab === 'all' ? '' : activeTab} appointments yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredAppointments.map((apt) => (
              <div
                key={apt._id}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 text-green-600 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">
                      🧑
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">
                        {apt.patientId?.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {apt.patientId?.email}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-gray-500 text-sm">
                          📅 {apt.date}
                        </span>
                        <span className="text-gray-500 text-sm">
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(apt._id, 'confirmed')}
                          className="bg-green-500 text-white px-4 py-1.5 rounded-xl text-sm hover:bg-green-600 transition font-medium"
                        >
                          ✅ Confirm
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(apt._id, 'cancelled')}
                          className="bg-red-500 text-white px-4 py-1.5 rounded-xl text-sm hover:bg-red-600 transition font-medium"
                        >
                          ❌ Cancel
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