import React from 'react';
import { Link } from 'react-router-dom'; // Optional, if you're using react-router

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">Oops! Page not found.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;