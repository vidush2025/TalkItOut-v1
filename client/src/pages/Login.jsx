import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { socket } from "../sockets/socket";

const Login = () => {
  const [userIdOrEmailOrPhone, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/login`,
        {
          userId: userIdOrEmailOrPhone, // can be phone/email/userId
          password,
        },
        {
          withCredentials: true,
        }
      );

      socket.connect();

      localStorage.setItem("auth", JSON.stringify(data.data.loggedInUser));
      navigate("/channels");


    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f0f23] to-[#1e1e3f] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#1a1a2e] p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center glow">Login</h2>

        <input
          type="text"
          placeholder="UserID / Email / Phone"
          value={userIdOrEmailOrPhone}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 bg-[#2b2b44] rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-[#2b2b44] rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
