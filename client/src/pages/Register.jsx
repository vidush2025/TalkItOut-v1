import { useState } from "react";
import axios from "axios";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f23] to-[#1e1e3f] text-white">
      <form
        onSubmit={handleRegister}
        className="bg-[#1a1a2e] p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center glow">
          Create Anonymous Account
        </h2>

        <input
          type="text"
          name="userId"
          placeholder="Unique User ID"
          required
          value={formData.userId}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 bg-[#2b2b44] rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 bg-[#2b2b44] rounded"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 bg-[#2b2b44] rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-[#2b2b44] rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-pink-600 hover:bg-pink-700 transition-colors rounded font-semibold"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
