import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/update-password`, form, {
        withCredentials: true,
      });
      alert("Password updated");
      navigate("/profile");
    } catch (err) {
      alert("Failed to update password");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1022] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded">
        <input
          className="input"
          name="oldPassword"
          type="password"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-600 px-4 py-2 rounded" type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
