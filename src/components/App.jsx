import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/Auth";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./PrivateRoute";
import HomePage from "./HomePage";
import Nav from "./Nav";
import Page404 from "../features/ui/404Page";
import RegisterClient from "./LogReg/Reg";
import Login from "./LogReg/Login";
import MyAccount from "./MyAccount";
import Reservations from "./Reservations";
import City from "./City"
import "react-toastify/dist/ReactToastify.min.css";
import Locations from "./Locations";
import Restaurant from "./Restaurant";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/register" element={<RegisterClient />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/my-account" element={<PrivateRoute component={MyAccount}/>}/>
          <Route path='/reservations' element={<PrivateRoute component={Reservations} />} />
          <Route path='/city/:cityName' element={<City />} />
          <Route path='/locations' element={<Locations />} />
          <Route path='restaurant/:cityName/:restaurantSlug' element={<Restaurant />} />
          <Route path='*' element={<Page404 />}/>
        </Routes>
        <footer className="h-60">
          {''}
        </footer>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
