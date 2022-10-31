import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Firebase Imports
// import { getAuth } from 'firebase/auth';
import { collection, where, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

// Component Imports
import RoomItem from '../../components/RoomItem';

// Third Party Imports
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

export default function Rooms() {
  // const auth = getAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      const roomRef = collection(db, 'rooms');
      const q = query(roomRef, where(roomRef.roomId === params.roomID), orderBy('timestamp', 'name'));
      const querySnap = await getDocs(q);
      let rooms = [];
      querySnap.forEach((doc) => {
        return rooms.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setRooms(rooms);
      setLoading(false);
    }
    fetchRooms();
  }, [params.roomID]);

  async function onDelete(roomID) {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'rooms', roomID));
      const updateRooms = rooms.filter((room) => room.id !== roomID);
      setRooms(updateRooms);
      toast.success('Successfully deleted room!');
    }
  }

  function onEdit(roomID) {
    navigate(`/rooms/edit-room/${roomID}`);
  }

  return (
    <div>
      <header className="flex justify-center mt-6">
        <button className="text-white text-lg font-medium uppercase bg-green-500 px-4 py-2 rounded hover:bg-green-600 shadow-md hover:shadow-lg cursor-pointer ">
          <Link to="/rooms/create-room" className="flex justify-center items-center">
            <FaPlus className="mr-2 bg-red-400 rounded-full p-1 border-2 text-2xl" />
            Add Room
          </Link>
        </button>
      </header>
      <main className="max-w-6lx px-3 mt-6 mx-auto">
        {!loading && rooms.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">My Rooms</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
              {rooms.map((room) => (
                <RoomItem
                  key={room.id}
                  id={room.id}
                  room={room.data}
                  onDelete={() => onDelete(room.id)}
                  onEdit={() => onEdit(room.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
