import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 px-6 relative overflow-hidden">

        {/* Background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <span className="bg-white/20 backdrop-blur text-white text-sm px-4 py-2 rounded-full mb-6 inline-block font-medium">
              🏥 Trusted by 5000+ patients
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Health, <br />
              <span className="text-blue-200">Our Priority</span>
            </h1>
            <p className="text-blue-100 text-xl mb-10 leading-relaxed">
              Book appointments with top doctors instantly. Fast, easy, and secure healthcare at your fingertips.
            </p>
            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 shadow-lg transition text-lg"
              >
                Get Started Free →
              </Link>
              <Link
                to="/doctors"
                className="border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition text-lg"
              >
                View Doctors
              </Link>
            </div>
          </div>

          {/* Hero Card */}
          <div className="flex-1 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 w-full max-w-sm border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow">
                  H
                </div>
                <div>
                  <p className="font-bold text-white">HealthCare App</p>
                  <p className="text-blue-200 text-sm">Your health companion</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="bg-green-400 w-10 h-10 rounded-xl flex items-center justify-center text-xl">
                    👨‍⚕️
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Dr. Sarah Smith</p>
                    <p className="text-blue-200 text-xs">Cardiologist • Available</p>
                  </div>
                  <span className="ml-auto bg-green-400 text-white text-xs px-2 py-1 rounded-full">
                    ✓
                  </span>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="bg-blue-400 w-10 h-10 rounded-xl flex items-center justify-center text-xl">
                    📅
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Appointment Booked</p>
                    <p className="text-blue-200 text-xs">Tomorrow at 10:00 AM</p>
                  </div>
                  <span className="ml-auto bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="bg-purple-400 w-10 h-10 rounded-xl flex items-center justify-center text-xl">
                    ⭐
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">4.9 Rating</p>
                    <p className="text-blue-200 text-xs">From 5000+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-600">100+</p>
            <p className="text-gray-500 mt-1">Expert Doctors</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">5K+</p>
            <p className="text-gray-500 mt-1">Happy Patients</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">20+</p>
            <p className="text-gray-500 mt-1">Specializations</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">4.9⭐</p>
            <p className="text-gray-500 mt-1">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-600 font-semibold text-center mb-2">WHY CHOOSE US</p>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Healthcare Made Simple
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg">
            Everything you need for a seamless healthcare experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '👨‍⚕️',
                color: 'bg-blue-100',
                title: 'Expert Doctors',
                desc: 'Choose from hundreds of verified specialist doctors across all medical fields'
              },
              {
                icon: '📅',
                color: 'bg-green-100',
                title: 'Easy Booking',
                desc: 'Book appointments in just a few clicks anytime, anywhere, 24/7'
              },
              {
                icon: '🔒',
                color: 'bg-purple-100',
                title: 'Secure & Private',
                desc: 'Your health data is 100% encrypted and completely private'
              },
              {
                icon: '⚡',
                color: 'bg-yellow-100',
                title: 'Instant Confirmation',
                desc: 'Get instant confirmation for your appointments without any waiting'
              },
              {
                icon: '📱',
                color: 'bg-red-100',
                title: 'Easy to Use',
                desc: 'Simple and intuitive interface designed for everyone'
              },
              {
                icon: '💊',
                color: 'bg-pink-100',
                title: 'All Specializations',
                desc: 'From general physicians to rare specialists, we have them all'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100"
              >
                <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-600 font-semibold text-center mb-2">HOW IT WORKS</p>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            3 Simple Steps
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg">
            Get started in minutes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                icon: '📝',
                title: 'Create Account',
                desc: 'Register as a patient in just 30 seconds for free'
              },
              {
                step: '02',
                icon: '🔍',
                title: 'Find a Doctor',
                desc: 'Browse doctors by specialization and read their profiles'
              },
              {
                step: '03',
                icon: '✅',
                title: 'Book & Confirm',
                desc: 'Pick a time slot and get instant confirmation'
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg">
                  {item.icon}
                </div>
                <span className="text-5xl font-bold text-gray-100 absolute top-0 left-1/2 -translate-x-1/2 -z-10">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-600 font-semibold text-center mb-2">TESTIMONIALS</p>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
            What Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Priya Sharma',
                role: 'Patient',
                review: 'Booking was so easy! Got an appointment with a cardiologist within minutes. Highly recommend!',
                rating: '⭐⭐⭐⭐⭐'
              },
              {
                name: 'Rahul Verma',
                role: 'Patient',
                review: 'The best healthcare app I have used. The doctors are very professional and the platform is smooth.',
                rating: '⭐⭐⭐⭐⭐'
              },
              {
                name: 'Anjali Singh',
                role: 'Patient',
                review: 'Amazing experience! I could track my appointment status in real time. Will use again!',
                rating: '⭐⭐⭐⭐⭐'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <p className="text-gray-600 leading-relaxed mb-4">
                  "{item.review}"
                </p>
                <p className="text-sm mb-2">{item.rating}</p>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-900 py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-xl mb-10">
            Join thousands of patients who trust HealthCare
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-12 py-4 rounded-2xl font-bold hover:bg-blue-50 shadow-xl inline-block text-lg transition"
          >
            Create Free Account →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
              H
            </div>
            <span className="text-white font-bold">HealthCare</span>
          </div>
          <p className="text-sm">© 2026 HealthCare App. Built with MERN Stack.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/doctors" className="hover:text-white transition">Doctors</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
            <Link to="/login" className="hover:text-white transition">Login</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;