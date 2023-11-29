import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from './components/Home'
import Nav from "./components/Nav";
import RegisterClient from "./pages/Register";
import LoginClient from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/register" element={<RegisterClient/>} />
        <Route path="/login" element={<LoginClient/>} />
        <Route path="/" element={<HomePage/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
