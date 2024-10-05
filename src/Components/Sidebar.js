import React from 'react';

function Sidebar() {
  return (
    <div className="w-64 min-h-max bg-gray-800 text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin sidebar</h2>
      <ul className="flex-1">
        <li className="mb-4">
          <a
            href="#"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition duration-200"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a1 1 0 011 1v5.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 8.586V3a1 1 0 011-1z" />
            </svg>
            Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition duration-200"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 2a1 1 0 00-1 1v2H3a1 1 0 00-1 1v8a1 1 0 001 1h2v2a1 1 0 001 1h8a1 1 0 001-1v-2h2a1 1 0 001-1v-8a1 1 0 00-1-1h-2V3a1 1 0 00-1-1H6zm0 2h8v2H6V4zm0 4h8v8H6V8z" />
            </svg>
            Users
          </a>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition duration-200"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 15a7 7 0 110-14 7 7 0 010 14z" />
              <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 110 10 5 5 0 010-10z" />
            </svg>
            Settings
          </a>
        </li>
      </ul>
      <div className="mt-auto p-4 border-t border-gray-700">
        <a
          href="#"
          className="block text-center text-gray-300 hover:text-white transition duration-200"
        >
          Logout
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
