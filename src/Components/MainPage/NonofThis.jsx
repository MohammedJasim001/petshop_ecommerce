import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NonofThis = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl mb-2">Oops! Page Not Found</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
          <button onClick={()=>navigate(-1)} 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out">
            Go Back 
          </button>
      </div>
    </div>
  );
};

export default NonofThis;
