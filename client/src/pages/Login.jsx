import { useState } from "react";
import axios from "../utils/axios";
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#14141e] to-[#23233a] text-white">
      <form
        onSubmit={handleLogin}
        className="relative bg-[#18182f] p-16 rounded-3xl shadow-xl w-[32rem] transition-all duration-300 group border-2 border-transparent hover:border-[#444466] hover:shadow-[0_0_24px_2px_#444466] subtle-neon"
      >
        {/* Subtle neon border animation */}
        <span className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[#444466] opacity-0 group-hover:opacity-80 transition-opacity duration-300"></span>
        <h2 className="text-4xl font-extrabold mb-10 text-center tracking-wide subtle-neon-text">Login</h2>

        <input
          type="text"
          placeholder="UserID / Email / Phone"
          value={userIdOrEmailOrPhone}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          className="w-full mb-7 px-6 py-4 bg-[#23233a] rounded-lg border-none outline-none text-lg focus:ring-2 focus:ring-[#444466] transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-10 px-6 py-4 bg-[#23233a] rounded-lg border-none outline-none text-lg focus:ring-2 focus:ring-[#444466] transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#444466] text-white font-bold rounded-lg text-lg shadow-md hover:bg-[#35354a] transition-all duration-200 subtle-neon-btn"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {/* Subtle neon effect styles */}
      <style>
        {`
          .subtle-neon {
            box-shadow: 0 0 16px 0 #23233a, 0 0 4px 0 #444466 inset;
          }
          .subtle-neon-text {
            text-shadow: 0 0 4px #444466, 0 0 8px #23233a;
          }
          .subtle-neon-btn {
            box-shadow: 0 0 8px #444466, 0 0 2px #23233a inset;
          }
          .subtle-neon-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
