import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/login', formData);
      login(data.user, data.token);
      if (data.user.role === 'patient') navigate('/patient-dashboard');
      else if (data.user.role === 'doctor') navigate('/doctor-dashboard');
      else if (data.user.role === 'admin') navigate('/admin-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex">

      {/* Left Side */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex-col justify-center items-center p-12">
        <div className="bg-white/10 backdrop-blur rounded-3xl p-10 text-center max-w-sm">
          <div className="text-7xl mb-6">🏥</div>
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-blue-100 text-lg">
            Login to manage your appointments and health records
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <span>✅</span>
              <span className="text-sm">Book appointments instantly</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <span>✅</span>
              <span className="text-sm">Track your health history</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <span>✅</span>
              <span className="text-sm">Connect with top doctors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">
              H
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Health<span className="text-blue-600">Care</span>
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sign in to your account
          </h1>
          <p className="text-gray-500 mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Register here
            </Link>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold transition shadow-sm disabled:opacity-70 mt-2"
            >
              {loading ? '⏳ Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            © 2026 HealthCare App. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;