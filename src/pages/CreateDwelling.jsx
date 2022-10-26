import React from 'react';
import { useState } from 'react';
import { FcHome } from 'react-icons/fc';

export default function CreateDwelling() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
  });

  const { name, address, description } = formData;

  function onChange() {
    console.log('On Change Called');
  }

  return (
    <main>
      <h1 className="text-3xl text-center mt-6 font-semibold">Create Dwelling</h1>
      <form>
        <div className="max-w-lg px-2 mx-auto">
          <div>
            <p className="text-lg mt-6 font-semibold">Name *</p>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              maxLength="32"
              minLength="10"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Address *</p>
            <textarea
              type="text"
              id="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Description *</p>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Images *</p>
            <p className="text-gray-600 ">The first image will be the cover (max 6)</p>
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg, .png, .jpeg"
              multiple
              required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 "
            />
          </div>
          <button
            type="submit"
            className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow:lg transition duration-150 ease-in-out"
          >
            <div className="flex justify-center items-center">
              <FcHome className="mr-6 bg-red-300 rounded-full p-1 border-2 text-3xl" />
              Add Dwelling
            </div>
          </button>
        </div>
      </form>
    </main>
  );
}
