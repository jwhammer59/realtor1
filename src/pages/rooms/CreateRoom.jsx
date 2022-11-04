import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Firebase Imports
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase';

// Component Imports
import Spinner from '../../components/Spinner';

// Third Party Imports
import { MdMeetingRoom } from 'react-icons/md';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export default function CreateRoom() {
  const navigate = useNavigate();
  const auth = getAuth();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    roomLevel: '',
    images: {},
  });

  const { name, description, roomLevel, images } = formData;

  function onChange(e) {
    console.log(e);
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

  function onHandleSelectChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      roomLevel: e.target.value,
    }));
  }

  async function onSubmit(e) {
    console.log(auth);
    e.preventDefault();
    setLoading(true);
    if (images.length > 3) {
      setLoading(false);
      toast.error('Maximum 3 images allowed!');
      return;
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
            console.log('error');
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
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
      dwellingId: params.dwellingId,
    };
    delete formDataCopy.images;
    const docRef = await addDoc(collection(db, 'rooms'), formDataCopy);
    setLoading(false);
    toast.success('Room created');
    navigate(`/room/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <h1 className="text-3xl text-center mt-6 font-semibold">Create Room</h1>
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
              <p className="text-lg font-semibold">Room Level</p>
              <select value={roomLevel} name="roomLevel" id="roomLevel" onChange={onHandleSelectChange}>
                <option value="first floor">1st Floor</option>
                <option value="basement">Basement</option>
                <option value="second floor">2nd Floor</option>
                <option value="third floor">3rd Floor</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Images *</p>
            <p className="text-gray-600 ">The first image will be the cover (max 3)</p>
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
              <MdMeetingRoom className="mr-6 bg-blue-900 rounded-full p-1 border-2 text-3xl" />
              Add Room
            </div>
          </button>
        </div>
      </form>
    </main>
  );
}
