import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Dwellings() {
  return (
    <div>
      <div className="flex justify-center mt-6">
        <button className="text-white text-lg font-medium uppercase bg-green-500 px-4 py-2 rounded hover:bg-green-600 shadow-md hover:shadow-lg cursor-pointer ">
          <Link to="/create-dwelling" className="flex justify-center items-center">
            <FaPlus className="mr-2 bg-red-400 rounded-full p-1 border-2 text-2xl" />
            Add Dwelling
          </Link>
        </button>
      </div>
    </div>
  );
}
