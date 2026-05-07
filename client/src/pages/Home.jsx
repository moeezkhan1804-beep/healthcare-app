import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to HealthCare 🏥
        </h1>
        <p className="text-xl mb-8">
          Book appointments with the best doctors near you
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Get Started
          </Link>
          <Link
            to="/doctors"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            View Doctors
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-4xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
            <p className="text-gray-600">
              Choose from a wide range of specialist doctors
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Book appointments in just a few clicks
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your health data is safe and secure with us
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;