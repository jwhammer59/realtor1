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
    </main>
  );
}
