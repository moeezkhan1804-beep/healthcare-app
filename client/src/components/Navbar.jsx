import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold shadow">
            H
          </div>
          <span className="text-xl font-bold text-gray-800">
            Health<span className="text-blue-600">Care</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Home
          </Link>
          <Link
            to="/doctors"
            className={`text-sm font-medium transition ${
              isActive('/doctors') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Doctors
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to={
                  user.role === 'patient'
                    ? '/patient-dashboard'
                    : user.role === 'doctor'
                    ? '/doctor-dashboard'
                    : '/admin-dashboard'
                }
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition"
              >
                <div className="bg-blue-600 text-white w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <Link to="/" className="text-gray-600 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/doctors" className="text-gray-600 font-medium" onClick={() => setMenuOpen(false)}>Doctors</Link>
          {!user ? (
            <>
              <Link to="/login" className="text-gray-600 font-medium" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-center font-medium" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-red-500 font-medium text-left">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;