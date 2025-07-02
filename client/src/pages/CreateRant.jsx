import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { FaArrowLeft } from "react-icons/fa";

const CreateRant = () => {
  const [content, setContent] = useState("");
  const [voice, setVoice] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!content && !voice) return alert("Write or record something!");

    const formData = new FormData();
    if (content) formData.append("content", content);
    if (voice) formData.append("voice", voice);

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/rant`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/rant");
    } catch (error) {
      alert("Failed to post rant.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1022] text-white px-6 py-8">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/rant")}
          className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
        >
          <FaArrowLeft />
          Back
        </button>
        <h1 className="text-2xl font-bold ml-4">Create a Rant</h1>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <textarea
          placeholder="Let your thoughts out here..."
          className="w-full bg-gray-800 p-4 rounded text-white resize-none"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mt-4 flex items-center gap-4">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setVoice(e.target.files[0])}
            className="text-sm text-gray-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!content && !voice}
          className={`mt-6 w-full py-2 rounded font-semibold ${
            content || voice
              ? "bg-pink-600 hover:bg-pink-700"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          Submit Rant
        </button>
      </div>
    </div>
  );
};

export default CreateRant;
