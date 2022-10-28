import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Dwellings from './pages/Dwellings';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Header from './components/Header';
import CreateDwelling from './pages/CreateDwelling';
import EditDwelling from './pages/EditDwelling';
import Dwelling from './pages/Dwelling';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/dwelling/:dwellingId" element={<Dwelling />}></Route>
          <Route path="/create-dwelling" element={<PrivateRoute />}>
            <Route path="/create-dwelling" element={<CreateDwelling />}></Route>
          </Route>
          <Route path="/edit-dwelling" element={<PrivateRoute />}>
            <Route path="/edit-dwelling/:dwellingId" element={<EditDwelling />}></Route>
          </Route>
          <Route path="/dwellings" element={<PrivateRoute />}>
            <Route path="/dwellings" element={<Dwellings />}></Route>
          </Route>

          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
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
