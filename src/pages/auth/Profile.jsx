import { getAuth, updateProfile } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Profile() {
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update name in firestore
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, {
          name: name,
        });
      }
      toast.success('Profile Updated!');
    } catch (error) {
      toast.error('Could not update profile details!');
    }
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col bg-gray-100 mt-6 rounded shadow-lg">
        <h1 className="text-3xl text-center mt-5">My Profile</h1>
        <div className="w-rull md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out ${
                changeDetail && 'bg-red-200 focus:bg-red-300'
              }`}
            />

            {/* Email Input */}
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out"
            />

            <div className="flex justify-center whitespace-nowrap text-sm lg:text-lg mb-6">
              <p className="flex items-center">
                Do you want to change your name?{' '}
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 font-semibold hover:text-red-700 transition duration-200 ease-in-out ml-6 cursor-pointer"
                >
                  {changeDetail ? 'Apply Change' : 'Edit'}
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
