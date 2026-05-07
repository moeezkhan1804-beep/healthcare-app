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

  const getStatusColor = (status) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-600';
    if (status === 'cancelled') return 'bg-red-100 text-red-600';
    return 'bg-yellow-100 text-yellow-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Admin Dashboard 👨‍💼
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-6 py-2 rounded-lg font-semibold ${
              activeTab === 'doctors'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Doctors ({doctors.length})
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-2 rounded-lg font-semibold ${
              activeTab === 'appointments'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Appointments ({appointments.length})
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : activeTab === 'doctors' ? (
          <div className="flex flex-col gap-4">
            {doctors.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow text-center">
                <p className="text-gray-500">No doctors registered yet</p>
              </div>
            ) : (
              doctors.map((doctor) => (
                <div key={doctor._id} className="bg-white p-6 rounded-xl shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Dr. {doctor.userId?.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {doctor.userId?.email}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Specialization: {doctor.specialization}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Experience: {doctor.experience} years
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        doctor.approved
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {doctor.approved ? 'Approved' : 'Pending'}
                      </span>
                      {!doctor.approved && (
                        <button
                          onClick={() => handleApprove(doctor._id)}
                          className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Approve
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
              <div className="bg-white p-8 rounded-xl shadow text-center">
                <p className="text-gray-500">No appointments yet</p>
              </div>
            ) : (
              appointments.map((apt) => (
                <div key={apt._id} className="bg-white p-6 rounded-xl shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Patient: {apt.patientId?.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Doctor: Dr. {apt.doctorId?.userId?.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        📅 {apt.date} at ⏰ {apt.time}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status}
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