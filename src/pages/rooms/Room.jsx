import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

// Firebase Imports
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// Component Imports
import Spinner from '../../components/Spinner';

// Third Party Library Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css/bundle';
import { FaCloudDownloadAlt, FaPlus } from 'react-icons/fa';

export default function Room() {
  const params = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

  useEffect(() => {
    async function fetchRoom() {
      const docRef = doc(db, 'rooms', params.roomId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRoom(docSnap.data());
        setLoading(false);
      }
    }
    fetchRoom();
  }, [room, params.roomId]);

  function onHandleAddItem() {
    navigate(`/create-item/${params.roomId}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="m-4 p-4 rounded-lg shadow-lg bg-white">
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {room.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{ background: `url(${room.imgUrls[index]}) center no-repeat`, backgroundSize: 'cover' }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-between h-[150px] sm:h-[100px] m-4 p-4 rounded-lg shadow-lg bg-white ">
        <div className="">
          <p className="text-2xl font-bold mb-3 text-blue-900">{room.name}</p>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Room Location - </span>
            <span className="capitalize">{room.roomLevel}</span>
          </p>
        </div>
        <div className=""></div>
      </div>
      <div className="flex flex-col sm:flex-row justify-around">
        <div className="mb-2">
          <button
            onClick={onHandleAddItem}
            className="w-full text-lg font-medium uppercase px-4 py-2 rounded border-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg cursor-pointer transition duration-150 ease-in-out"
          >
            <span className="flex justify-center items-center">
              Add Item
              <FaPlus className="ml-5 text-xl" />
            </span>
          </button>
        </div>
        <div className="mb-2">
          <button className="w-full text-green-600 text-lg font-medium uppercase px-4 py-2 rounded hover:text-white hover:bg-green-600 border-2 border-green-600 shadow-md hover:shadow-lg cursor-pointer transition duration-150 ease-in-out">
            <span className="flex justify-center items-center">
              Load All Items
              <FaCloudDownloadAlt className="ml-5 text-xl" />
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
