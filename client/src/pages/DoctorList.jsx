import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const specializations = ['All', ...new Set(doctors.map(d => d.specialization))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||
      doctor.userId?.name.toLowerCase().includes(search.toLowerCase());
    const matchesSpec =
      selectedSpec === 'All' || doctor.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  const handleBooking = (doctorId) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/book/${doctorId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-14">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">
            Find Your Doctor 👨‍⚕️
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Choose from our verified specialist doctors
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Specialization Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                selectedSpec === spec
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-6">
          Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-5xl mb-4">⏳</div>
              <p className="text-gray-500">Loading doctors...</p>
            </div>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-500">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden"
              >
                {/* Card Top */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-5 flex items-center gap-4">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                    👨‍⚕️
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      Dr. {doctor.userId?.name}
                    </p>
                    <p className="text-blue-600 text-sm font-medium">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 py-4">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center bg-gray-50 rounded-xl py-2">
                      <p className="text-lg font-bold text-gray-800">
                        {doctor.experience}
                      </p>
                      <p className="text-gray-500 text-xs">Years Exp</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-xl py-2">
                      <p className="text-lg font-bold text-gray-800">
                        ₹{doctor.fees}
                      </p>
                      <p className="text-gray-500 text-xs">Fees</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-xl py-2">
                      <p className="text-lg font-bold text-green-600">
                        ✓
                      </p>
                      <p className="text-gray-500 text-xs">Verified</p>
                    </div>
                  </div>

                  {doctor.address && (
                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                      📍 {doctor.address}
                    </p>
                  )}

                  <div className="flex gap-2">
  <button
    onClick={() => navigate(`/doctors/${doctor._id}`)}
    className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition font-semibold"
  >
    View Profile
  </button>
  <button
    onClick={() => handleBooking(doctor._id)}
    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold shadow-sm"
  >
    Book →
  </button>
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

export default DoctorList;