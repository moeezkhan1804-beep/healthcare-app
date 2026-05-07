import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">
        🏥 HealthCare
      </Link>

      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm">Hello, {user.name}</span>
            {user.role === 'patient' && (
              <Link to="/patient-dashboard" className="hover:underline">Dashboard</Link>
            )}
            {user.role === 'doctor' && (
              <Link to="/doctor-dashboard" className="hover:underline">Dashboard</Link>
            )}
            {user.role === 'admin' && (
              <Link to="/admin-dashboard" className="hover:underline">Dashboard</Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;