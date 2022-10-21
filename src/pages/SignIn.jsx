import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Email and/or Password do not match');
    }
  }
  return (
    <section>
      <div className="text-3xl text-center mt-6 font-bold">Sign In</div>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2lnbiUyMHVwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
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

            {/* Password Input */}
            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl- cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl- cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-150 ease-in-out ml-2"
                  to="/sign-in"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">
              Sign In
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
