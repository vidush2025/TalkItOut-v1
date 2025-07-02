import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Channels from "../pages/Channels";
import Chatroom from "../pages/Chatroom";
import RantSpace from "../pages/RantSpace";
import ProtectedLayout from "../layouts/ProtectedLayout";
import CreateChannelPage from "../pages/createChannelPage";
import Profile from "../pages/Profile";
import CreateRant from "../pages/CreateRant";
import UpdateProfile from "../pages/UpdateProfile"
import ChangePassword from "../pages/ChangePassword";


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
        <Route path="/create-channel" element={<CreateChannelPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/rant" element={<RantSpace />} />
          <Route path="/rant/create" element={<CreateRant />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />        

      </Route>
    </Routes>
  );
};

export default AppRoutes;
