import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export default function Header() {
  const [pageState, setPageState] = useState('Sign In');
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState('Sign Out');
      } else {
        setPageState('Sign In');
      }
    });
  }, [auth]);
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  function onHandleClick() {
    if (pageState === 'Sign Out') {
      auth.signOut();
      navigate('/');
    } else {
      navigate('/sign-in');
    }
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <button className="text-lg text-blue-500 font-bold" onClick={() => navigate('/')}>
            Home Inventory Trakr
          </button>
          {/* <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate('/')}
          /> */}
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute('/') && 'text-black border-b-red-500'
              }`}
              onClick={() => navigate('/')}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute('/dwellings/dwellings') && 'text-black border-b-red-500'
              }`}
              onClick={() => navigate('/dwellings/dwellings')}
              hidden={pageState === 'Sign In' ? true : false}
            >
              Dwellings
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute('/profile') && 'text-black border-b-red-500'
              }`}
              onClick={() => navigate('/profile')}
              hidden={pageState === 'Sign In' ? true : false}
            >
              Profile
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute('/sign-in') && 'text-black border-b-red-500'
              }`}
              onClick={onHandleClick}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
