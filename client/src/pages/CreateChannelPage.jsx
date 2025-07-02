import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const CreateChannelPage = () => {
  const [channelName, setChannelName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!channelName.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/channels/createChannel`,
        {
          name: channelName,
          isPublic
        },
        { withCredentials: true }
      );

      const createdChannel = res.data?.data;
      if (createdChannel?.channelId) {
        navigate(`/chatroom/${createdChannel.channelId}`);
      } else {
        alert("Channel created, but could not navigate.");
      }
    } catch (err) {
      alert("Failed to create channel");
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold mb-6">Create a New Channel</h2>

      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Enter channel name"
        className="px-4 py-2 mb-4 bg-gray-800 rounded w-full max-w-md"
      />

      <div className="flex items-center mb-4 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="true"
            checked={isPublic}
            onChange={() => setIsPublic(true)}
            className="accent-pink-600"
          />
          Public
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="false"
            checked={!isPublic}
            onChange={() => setIsPublic(false)}
            className="accent-pink-600"
          />
          Private
        </label>
      </div>

      <button
        onClick={handleCreate}
        className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded font-semibold"
      >
        Create
      </button>
    </div>
  );
};

export default CreateChannelPage;
