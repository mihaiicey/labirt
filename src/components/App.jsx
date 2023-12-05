import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/Auth";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./PrivateRoute";
import HomePage from "./home";
import Nav from "./Nav";
import RegisterClient from "./LogReg/Reg";
import Login from "./LogReg/Login";
import MyAccount from "./MyAccount";
import Reservations from "./Reservations";
import "react-toastify/dist/ReactToastify.min.css";

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
        </Routes>

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
