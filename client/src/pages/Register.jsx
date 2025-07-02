import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("auth", JSON.stringify(res.data.data));
      navigate("/channels");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#14141e] to-[#23233a] text-white">
      <form
        onSubmit={handleRegister}
        className="relative bg-[#18182f] p-16 rounded-3xl shadow-xl w-[32rem] transition-all duration-300 group border-2 border-transparent hover:border-[#444466] hover:shadow-[0_0_24px_2px_#444466] subtle-neon"
      >
        {/* Subtle neon border animation */}
        <span className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[#444466] opacity-0 group-hover:opacity-80 transition-opacity duration-300"></span>
        <h2 className="text-4xl font-extrabold mb-10 text-center tracking-wide subtle-neon-text">
          Create Anonymous Account
        </h2>

        <input
          type="text"
          name="userId"
          placeholder="Unique User ID"
          required
          value={formData.userId}
          onChange={handleChange}
          className="w-full mb-7 px-6 py-4 bg-[#23233a] rounded-lg border-none outline-none text-lg focus:ring-2 focus:ring-[#444466] transition"
        />

        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-7 px-6 py-4 bg-[#23233a] rounded-lg border-none outline-none text-lg focus:ring-2 focus:ring-[#444466] transition"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-7 px-6 py-4 bg-[#23233a] rounded-lg border-none outline-none text-lg focus:ring-2 focus:ring-[#444466] transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-10 px-6 py-4 bg-[#23233a] rounded-lg border-none outline-none text-lg focus:ring-2 focus:ring-[#444466] transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#444466] text-white font-bold rounded-lg text-lg shadow-md hover:bg-[#35354a] transition-all duration-200 subtle-neon-btn"
        >
          {loading ? "Registering..." : "Register"}
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

export default Register;
