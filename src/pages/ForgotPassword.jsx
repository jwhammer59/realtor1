import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  function onChange(e) {
    setEmail(e.target.value);
  }

  return (
    <section>
      <div className="text-3xl text-center mt-6 font-bold">Forgot Password</div>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2lnbiUyMHVwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            {/* Email Input */}
            <div>
              <input
                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out"
                type="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Email Address"
              />
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-150 ease-in-out ml-2"
                  to="/sign-up"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out" to="/sign-in">
                  Sign In Instead
                </Link>
              </p>
            </div>
            <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">
              Send Email Reset
            </button>
            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
