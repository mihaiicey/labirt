import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/Auth";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./PrivateRoute";
import HomePage from "./HomePage";
import Nav from "./Nav";
import ErrorPage from "@/features/ui/ErrorPage";
import ToBeContinued from "@/features/ui/ToBeContinued";
import RegisterClient from "./LogReg/Reg";
import Login from "./LogReg/Login";
import MyAccount from "./MyAccount";
import MyReservations from "./Reservations";
import City from "./City"
import "react-toastify/dist/ReactToastify.min.css";
import Locations from "./Locations";
import Restaurant from "./Restaurant";
import MyRestaurants from './Admin/MyRestaurants'
import ResetPassword from "./MyAccount/ResetPasswd";
import EditReservationCl from "./Reservations/EditR";
import AddEditRestaurant from "./Admin/MyRestaurants/AddEdit";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/register" element={<RegisterClient />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/my-account" element={<PrivateRoute><MyAccount/></PrivateRoute>}/>
          <Route path="/my-account/passwordReset" element={<PrivateRoute><ResetPassword/></PrivateRoute>}/>
          <Route path='/reservations' element={<PrivateRoute><MyReservations/></PrivateRoute>} />
          <Route path='/reservations/edit/:rsvId/:restaurantName' element={<PrivateRoute><EditReservationCl/></PrivateRoute>} />
          <Route path='/city/:cityName' element={<City />} />
          <Route path='/locations' element={<Locations />} />
          <Route path='restaurant/:cityName/:restaurantSlug' element={<Restaurant />} />
          <Route path='/admin/restaurants' element={<PrivateRoute allowedRoles={['admin','manager']}><MyRestaurants/></PrivateRoute>}/>
          <Route path='/admin/restaurants/addEdit/:id?' element={<PrivateRoute allowedRoles={['admin','manager']}><AddEditRestaurant/></PrivateRoute>}/>
          <Route path='/admin/restaurants/reservations/:id' element={<PrivateRoute allowedRoles={['admin','manager']}><ToBeContinued/></PrivateRoute>}/>
          
          <Route path='*' element={<ErrorPage error={404} shortMsg={'Not Found'}/>}/>
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
