import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('doctors');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [doctorsRes, appointmentsRes] = await Promise.all([
        API.get('/doctors/admin/all'),
        API.get('/appointments/admin/all')
      ]);
      setDoctors(doctorsRes.data);
      setAppointments(appointmentsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/doctors/admin/approve/${id}`);
      fetchData();
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

  const approvedDoctors = doctors.filter(d => d.approved).length;
  const pendingDoctors = doctors.filter(d => !d.approved).length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div>
            <p className="text-blue-200 text-sm mb-1">Welcome back 👋</p>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-blue-200 mt-1">Admin Dashboard</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{doctors.length}</p>
              <p className="text-blue-200 text-sm mt-1">👨‍⚕️ Total Doctors</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{approvedDoctors}</p>
              <p className="text-blue-200 text-sm mt-1">✅ Approved</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{pendingDoctors}</p>
              <p className="text-blue-200 text-sm mt-1">⏳ Pending</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold">{appointments.length}</p>
              <p className="text-blue-200 text-sm mt-1">📅 Appointments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-2xl shadow-sm w-fit">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === 'doctors'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            👨‍⚕️ Doctors ({doctors.length})
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === 'appointments'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📅 Appointments ({appointments.length})
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-5xl mb-4">⏳</div>
              <p className="text-gray-500">Loading data...</p>
            </div>
          </div>
        ) : activeTab === 'doctors' ? (
          <div className="flex flex-col gap-4">
            {doctors.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <p className="text-gray-500 text-lg">No doctors registered yet</p>
              </div>
            ) : (
              doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">
                        👨‍⚕️
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">
                          Dr. {doctor.userId?.name}
                        </p>
                        <p className="text-blue-600 text-sm font-medium">
                          {doctor.specialization}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-gray-500 text-sm">
                            🎓 {doctor.experience} years exp
                          </span>
                          <span className="text-gray-500 text-sm">
                            💰 ₹{doctor.fees}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          {doctor.userId?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                        doctor.approved
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {doctor.approved ? '✅ Approved' : '⏳ Pending'}
                      </span>
                      {!doctor.approved && (
                        <button
                          onClick={() => handleApprove(doctor._id)}
                          className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition font-medium"
                        >
                          Approve Doctor
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {appointments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-500 text-lg">No appointments yet</p>
              </div>
            ) : (
              appointments.map((apt) => (
                <div
                  key={apt._id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">
                        📋
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {apt.patientId?.name}
                        </p>
                        <p className="text-blue-600 text-sm">
                          Dr. {apt.doctorId?.userId?.name} — {apt.doctorId?.specialization}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-gray-500 text-sm">
                            📅 {apt.date}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ⏰ {apt.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusStyle(apt.status)}`}>
                      {getStatusIcon(apt.status)} {apt.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;