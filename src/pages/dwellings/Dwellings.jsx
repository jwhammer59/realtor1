import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Firebase Imports
import { getAuth } from 'firebase/auth';
import { collection, where, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

// Component Imports
import DwellingItem from '../../components/DwellingItem';

// Third Party Imports
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

export default function Dwellings() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [dwellings, setDwellings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserDwellings() {
      setLoading(true);
      const dwellingRef = collection(db, 'dwellings');
      const q = query(dwellingRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));
      const querySnap = await getDocs(q);
      let dwellings = [];
      querySnap.forEach((doc) => {
        return dwellings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setDwellings(dwellings);
      setLoading(false);
    }
    fetchUserDwellings();
  }, [auth.currentUser.uid]);

  async function onDelete(dwellingID) {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'dwellings', dwellingID));
      const updateDwellings = dwellings.filter((dwelling) => dwelling.id !== dwellingID);
      setDwellings(updateDwellings);
      toast.success('Successfully deleted dwelling!');
    }
  }

  function onEdit(dwellingID) {
    navigate(`/edit-dwelling/${dwellingID}`);
  }

  return (
    <div>
      <header className="flex justify-center mt-6">
        <button className="text-green-600 text-lg font-medium uppercase px-4 py-2 rounded border-2 border-green-600 hover:bg-green-600 hover:text-white shadow-md hover:shadow-lg cursor-pointer ">
          <Link to="/create-dwelling" className="flex justify-center items-center">
            <FaPlus className="mr-2 rounded-full p-1 text-2xl" />
            Add Dwelling
          </Link>
        </button>
      </header>
      <main className="max-w-6lx px-3 mt-6 mx-auto">
        {!loading && dwellings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">My Dwellings</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
              {dwellings.map((dwelling) => (
                <DwellingItem
                  key={dwelling.id}
                  id={dwelling.id}
                  dwelling={dwelling.data}
                  onDelete={() => onDelete(dwelling.id)}
                  onEdit={() => onEdit(dwelling.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
