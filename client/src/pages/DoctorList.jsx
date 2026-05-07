import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await API.get('/doctors');
      setDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||
    doctor.userId?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Find a Doctor 👨‍⚕️
        </h1>
        <p className="text-gray-600 mb-6">
          Browse and book appointments with our specialists
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:border-blue-500"
        />

        {loading ? (
          <p className="text-gray-500">Loading doctors...</p>
        ) : filteredDoctors.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">No doctors found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-4">
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
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-sm text-gray-600 mb-4">
                  <p>🎓 Experience: {doctor.experience} years</p>
                  <p>💰 Fees: ₹{doctor.fees}</p>
                  {doctor.address && <p>📍 {doctor.address}</p>}
                </div>
                <Link
                  to={`/book/${doctor._id}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Book Appointment
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;