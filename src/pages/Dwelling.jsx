import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css/bundle';
import { FaMapMarkerAlt, FaBed, FaBath } from 'react-icons/fa';

export default function Dwelling() {
  const params = useParams();
  const [dwelling, setDwelling] = useState(null);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

  useEffect(() => {
    async function fetchDwelling() {
      const docRef = doc(db, 'dwellings', params.dwellingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDwelling(docSnap.data());
        setLoading(false);
      }
    }
    fetchDwelling();
  }, [params.dwellingId, dwelling]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {dwelling.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{ background: `url(${dwelling.imgUrls[index]}) center no-repeat`, backgroundSize: 'cover' }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col md:flex-row max-w-6xl lg:mx-auto m-4 p-4 rounded-lg shadow-lg bg-white md:space-x-5">
        <div className="w-full h-[200px] lg-[400px]">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {dwelling.name} - ${dwelling.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-2" />
            {dwelling.address}
          </p>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {dwelling.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+dwelling.bedrooms > 1 ? `${dwelling.bedrooms} Beds` : '1 Bed'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+dwelling.bathrooms > 1 ? `${dwelling.bathrooms} Baths` : '1 Bath'}
            </li>
          </ul>
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}
