import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import About from "../pages/About";
import DashboardUser from "../pages/DashboardUser";
import DashboardAdmin from "../pages/DashboardAdmin";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PÁGINA PRINCIPAL */}
      <Route path="/" element={<Home />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />

      {/* PRIVADAS */}
      <Route
        path="/user"
        element={
          <PrivateRoute role="user">
            <DashboardUser />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <DashboardAdmin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}