import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Channels from "../pages/Channels";
import Chatroom from "../pages/Chatroom";
import RantSpace from "../pages/RantSpace";
import ProtectedLayout from "../layouts/ProtectedLayout";

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("auth");

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/channels" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/channels" element={<Channels />} />
        <Route path="/chatroom/:channelId" element={<Chatroom />} />
        <Route path="/rant" element={<RantSpace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
