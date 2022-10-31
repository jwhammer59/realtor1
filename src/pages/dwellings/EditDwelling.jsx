import React from 'react';
import { useState } from 'react';
import { FcHome } from 'react-icons/fc';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function EditDwelling() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dwelling, setDwelling] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    bedrooms: 1,
    bathrooms: 1,
    cost: 0,
    size: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });

  const { name, address, description, bedrooms, bathrooms, cost, size, latitude, longitude, images } = formData;

  const params = useParams();

  useEffect(() => {
    if (dwelling && dwelling.userRef !== auth.currentUser.uid) {
      toast.error('You cannot edit this dwelling!');
      navigate('/');
    }
  }, [auth.currentUser.uid, dwelling, navigate]);

  useEffect(() => {
    setLoading(true);
    async function fetchDwelling() {
      const docRef = doc(db, 'dwellings', params.dwellingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDwelling(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate('/');
        toast.error('Dwelling does not exist');
      }
    }
    fetchDwelling();
  }, [navigate, params.dwellingId]);

  function onChange(e) {
    let boolean = null;
    if (e.target.files === 'true') {
      boolean = true;
    }
    if (e.target.files === 'false') {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function onSubmit(e) {
    console.log(auth);
    e.preventDefault();
    setLoading(true);
    if (images.length > 6) {
      setLoading(false);
      toast.error('Maximum 6 images allowed!');
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === 'ZERO_RESULTS' && undefined;

      if (location === undefined) {
        setLoading(false);
        toast.error('Please enter a valid address!');
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch((error) => {
      setLoading(false);
      toast.error('Images not uploaded');
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = doc(db, 'dwellings', params.dwellingId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success('Dwelling updated!');
    navigate(`/dwellings/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <h1 className="text-3xl text-center mt-6 font-semibold">Edit Dwelling</h1>
      <form onSubmit={onSubmit}>
        <div className="max-w-lg px-2 mx-auto">
          <div>
            <p className="text-lg mt-6 font-semibold">Name *</p>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              maxLength="32"
              minLength="10"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Address *</p>
            <textarea
              type="text"
              id="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
            {!geolocationEnabled && (
              <div className="flex space-x-6 justify-start mb-6">
                <div className="w-full">
                  <p className="text-lg font-semibold">Latitude</p>
                  <input
                    type="number"
                    id="latitude"
                    value={latitude}
                    onChange={onChange}
                    required
                    min="-90"
                    max="90"
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                  />
                </div>
                <div className="w-full">
                  <p className="text-lg font-semibold">Longitude</p>
                  <input
                    type="number"
                    id="longitude"
                    value={longitude}
                    onChange={onChange}
                    required
                    min="-180"
                    max="180"
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="text-lg font-semibold">Description *</p>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
          <div className="flex space-x-6 mb-6">
            <div className="w-full">
              <p className="text-lg font-semibold">Beds</p>
              <input
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onChange}
                min="1"
                max="20"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
            <div className="w-full">
              <p className="text-lg font-semibold">Baths</p>
              <input
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onChange}
                min="1"
                max="20"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
          </div>
          <div className="flex space-x-6 mb-6">
            <div className="w-full">
              <p className="text-lg font-semibold">
                Value<span className="ml-2">$</span>
              </p>
              <input
                type="number"
                id="cost"
                value={cost}
                onChange={onChange}
                min="100"
                max="40000000"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
            <div className="w-full">
              <p className="text-lg font-semibold">
                Size /<span className="text-sm">Sq. Ft.</span>
              </p>
              <input
                type="number"
                id="size"
                value={size}
                onChange={onChange}
                min="100"
                max="50000"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
          </div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Images *</p>
            <p className="text-gray-600 ">The first image will be the cover (max 6)</p>
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg, .png, .jpeg"
              multiple
              required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 "
            />
          </div>
          <button
            type="submit"
            className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow:lg transition duration-150 ease-in-out"
          >
            <div className="flex justify-center items-center">
              <FcHome className="mr-6 bg-red-300 rounded-full p-1 border-2 text-3xl" />
              Edit Dwelling
            </div>
          </button>
        </div>
      </form>
    </main>
  );
}
