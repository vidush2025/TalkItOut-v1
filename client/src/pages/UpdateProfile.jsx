import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    userId: "",
    autoDelete: true,
    deleteAfter: 1
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/profile`, {
      withCredentials: true,
    }).then((res) => {
      const data = res.data.data;
      setForm({
        email: data.email || "",
        phone: data.phone || "",
        userId: data.userId || "",
        autoDelete: data.rantPreferences?.autoDelete ?? true,
        deleteAfter: data.rantPreferences?.deleteAfter ?? 1,
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/update-user-details`, form, {
        withCredentials: true,
      });
      alert("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1022] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded">
        <input className="input" name="userId" value={form.userId} onChange={handleChange} placeholder="User ID" required />
        <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <div>
          <label>
            <input type="checkbox" name="autoDelete" checked={form.autoDelete} onChange={handleChange} /> Auto Delete Rants
          </label>
        </div>
        <input
          type="number"
          className="input"
          name="deleteAfter"
          value={form.deleteAfter}
          onChange={handleChange}
          placeholder="Delete after (hours)"
          min="1"
        />
        <button className="bg-pink-600 px-4 py-2 rounded" type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
