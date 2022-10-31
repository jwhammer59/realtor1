import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { db } from '../../firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css/bundle';
import { FaMapMarkerAlt, FaBed, FaBath, FaArrowCircleRight } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
          <div className="mt-6">
            <button className="w-full text-white text-lg font-medium uppercase bg-green-500 px-4 py-2 rounded hover:bg-green-600 shadow-md hover:shadow-lg cursor-pointer transition duration-150 ease-in-out">
              <Link to={`/rooms/room/${params.dwellingId}`} className="flex justify-center items-center">
                See All Rooms
                <FaArrowCircleRight className="ml-5 text-xl" />
              </Link>
            </button>
          </div>
        </div>
        <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 lg:mt-0">
          <MapContainer
            center={[dwelling.geolocation.lat, dwelling.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[dwelling.geolocation.lat, dwelling.geolocation.lng]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
