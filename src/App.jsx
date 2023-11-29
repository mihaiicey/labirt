import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Nav from "./components/Nav";
import RegisterClient from "./pages/Register";
import LoginClient from "./pages/Login";
// import dotenv from 'dotenv'
// dotenv.config()

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/register" element={<RegisterClient/>} />
        <Route path="/login" element={<LoginClient/>} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
