import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import RantCard from "../components/RantCard";
import PremiumModal from "../components/PremiumModal";

const RantSpace = () => {
  const [rants, setRants] = useState([]);
  const [content, setContent] = useState("");
  const [voice, setVoice] = useState(null);
  const [showPremium, setShowPremium] = useState(false);
  const navigate = useNavigate();

  const fetchRants = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/rant`, {
        withCredentials: true,
      });
      setRants(res.data.data || []);
    } catch (err) {
      alert("Failed to load rants.");
    }
  };

  const postRant = async () => {
    if (!content && !voice) return;

    const formData = new FormData();
    if (content) formData.append("content", content);
    if (voice) formData.append("voice", voice);

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/rant`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setContent("");
      setVoice(null);
      fetchRants();
    } catch (err) {
      alert("Failed to post rant.");
    }
  };

  const deleteRant = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/rant/${id}`, {
        withCredentials: true,
      });
      fetchRants();
    } catch (err) {
      alert("Failed to delete rant.");
    }
  };

  useEffect(() => {
    fetchRants();
  }, []);

  return (
    <div className="min-h-screen bg-[#0c1022] text-white p-6">
      <h1 className="text-3xl font-bold mb-4">RantSpace</h1>

      {/* Input section */}
      <div className="bg-gray-900 p-4 rounded-lg mb-6">
        <textarea
          placeholder="Type your rant..."
          className="w-full bg-gray-800 p-3 rounded mb-3"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setVoice(e.target.files[0])}
            className="text-sm text-gray-400"
          />
          <button
            onClick={postRant}
            disabled={!content && !voice}
            className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded"
          >
            Post Rant
          </button>
        </div>
      </div>

      {/* Premium button + Create New Rant */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowPremium(true)}
          className="flex items-center gap-2 text-yellow-400 border border-yellow-500 px-4 py-2 rounded hover:bg-yellow-900 transition-all"
        >
          <FaStar />
          Premium Features (Coming Soon)
        </button>

        <button
          onClick={() => navigate("/rant/create")}
          className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded"
        >
          + Create New Rant
        </button>
      </div>

      {/* Rant List */}
      <div className="grid md:grid-cols-2 gap-4">
        {rants.map((rant) => (
          <RantCard key={rant._id} rant={rant} onDelete={deleteRant} />
        ))}
      </div>

      <PremiumModal isOpen={showPremium} onClose={() => setShowPremium(false)} />
    </div>
  );
};

export default RantSpace;
