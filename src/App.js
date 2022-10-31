import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Dwellings from './pages/dwellings/Dwellings';
import Dwelling from './pages/dwellings/Dwelling';
import CreateDwelling from './pages/dwellings/CreateDwelling';
import EditDwelling from './pages/dwellings/EditDwelling';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Header from './components/Header';
import Rooms from './pages/rooms/Rooms';
import Room from './pages/rooms/Room';
import CreateRoom from './pages/rooms/CreateRoom';
import EditRoom from './pages/rooms/EditRoom';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />}></Route>

          {/* Profile Route */}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>

          {/* Dwelling Routes */}
          <Route path="/dwellings/dwellings" element={<PrivateRoute />}>
            <Route path="/dwellings/dwellings" element={<Dwellings />}></Route>
          </Route>
          <Route path="/dwellings/dwelling/:dwellingId" element={<PrivateRoute />}>
            <Route path="/dwellings/dwelling/:dwellingId" element={<Dwelling />}></Route>
          </Route>
          <Route path="/dwellings/create-dwelling" element={<PrivateRoute />}>
            <Route path="/dwellings/create-dwelling" element={<CreateDwelling />}></Route>
          </Route>
          <Route path="/dwellings/edit-dwelling/:dwellingId" element={<PrivateRoute />}>
            <Route path="/dwellings/edit-dwelling/:dwellingId" element={<EditDwelling />}></Route>
          </Route>

          {/* Room Routes */}
          <Route path="/rooms/rooms" element={<PrivateRoute />}>
            <Route path="/rooms/rooms" element={<Rooms />}></Route>
          </Route>
          <Route path="/rooms/room/:roomId" element={<PrivateRoute />}>
            <Route path="/rooms/room/:roomId" element={<Room />}></Route>
          </Route>
          <Route path="/rooms/create-room" element={<PrivateRoute />}>
            <Route path="/rooms/create-room" element={<CreateRoom />}></Route>
          </Route>
          <Route path="/rooms/edit-room/:roomId" element={<PrivateRoute />}>
            <Route path="/rooms/edit-room/:roomId" element={<EditRoom />}></Route>
          </Route>

          {/* Sign-in, Sign-up Routes */}
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>

          {/* Misc Routes */}
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
