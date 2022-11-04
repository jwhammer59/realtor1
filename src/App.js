import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/common/Home';
import Dwellings from './pages/dwellings/Dwellings';
import Dwelling from './pages/dwellings/Dwelling';
import CreateDwelling from './pages/dwellings/CreateDwelling';
import EditDwelling from './pages/dwellings/EditDwelling';
import Profile from './pages/auth/Profile';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/common/ForgotPassword';
import Header from './components/Header';
import Rooms from './pages/rooms/Rooms';
import Room from './pages/rooms/Room';
import CreateRoom from './pages/rooms/CreateRoom';
import EditRoom from './pages/rooms/EditRoom';
import Items from './pages/items/Items';
import Item from './pages/items/Item';
import CreateItem from './pages/items/CreateItem';
import EditItem from './pages/items/EditItem';

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
          <Route path="/dwellings" element={<PrivateRoute />}>
            <Route path="/dwellings" element={<Dwellings />}></Route>
          </Route>
          <Route path="/dwelling/:dwellingId" element={<PrivateRoute />}>
            <Route path="/dwelling/:dwellingId" element={<Dwelling />}></Route>
          </Route>
          <Route path="/create-dwelling" element={<PrivateRoute />}>
            <Route path="/create-dwelling" element={<CreateDwelling />}></Route>
          </Route>
          <Route path="/edit-dwelling/:dwellingId" element={<PrivateRoute />}>
            <Route path="/edit-dwelling/:dwellingId" element={<EditDwelling />}></Route>
          </Route>

          {/* Room Routes */}
          <Route path="/rooms/:dwellingId" element={<PrivateRoute />}>
            <Route path="/rooms/:dwellingId" element={<Rooms />}></Route>
          </Route>
          <Route path="/room/:roomId" element={<PrivateRoute />}>
            <Route path="/room/:roomId" element={<Room />}></Route>
          </Route>
          <Route path="/create-room/:dwellingId" element={<PrivateRoute />}>
            <Route path="/create-room/:dwellingId" element={<CreateRoom />}></Route>
          </Route>
          <Route path="/edit-room/:roomId" element={<PrivateRoute />}>
            <Route path="/edit-room/:roomId" element={<EditRoom />}></Route>
          </Route>

          {/* Item Routes */}
          <Route path="/items/:roomId" element={<PrivateRoute />}>
            <Route path="/items/:roomId" element={<Items />}></Route>
          </Route>
          <Route path="/item/:itemId" element={<PrivateRoute />}>
            <Route path="/item/:itemId" element={<Item />}></Route>
          </Route>
          <Route path="/create-item/:roomId" element={<PrivateRoute />}>
            <Route path="/create-item/:roomId" element={<CreateItem />}></Route>
          </Route>
          <Route path="/edit-item/:itemId" element={<PrivateRoute />}>
            <Route path="/edit-item/:itemId" element={<EditItem />}></Route>
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
