import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/profile`, {
        withCredentials: true,
      });
      setUser(res.data.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return <div className="text-center text-white mt-10">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0c1022] text-white px-6 py-10 flex flex-col items-center">
      <div className="bg-[#1f2937] p-6 rounded-lg shadow-md w-full max-w-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">👤 Profile</h1>
          {user.isPremium && (
            <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm">
              <FaStar className="text-yellow-400" /> Premium Member
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm text-gray-400">Username</p>
            <p className="text-lg font-medium">{user.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Joined</p>
            <p className="text-lg font-medium">{new Date(user.createdAt).toDateString()}</p>
          </div>
        </div>

        <button
          onClick={async () => {
            try {
              await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/users/logout`,
                {},
                { withCredentials: true }
              );
            } catch (error) {
              console.error("Logout failed", error);
            } finally {
              localStorage.removeItem("auth");
              navigate("/login");
            }
          }}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
