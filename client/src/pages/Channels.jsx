import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  const fetchChannels = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/channels`, {
        withCredentials: true,
      });
      setChannels(res.data.data || []);
    } catch (err) {
      alert("Failed to fetch channels");
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const enterChannel = (channelId) => {
    navigate(`/chatroom/${channelId}`);
  };

  const goToCreateChannel = () => {
    navigate("/create-channel");
  };

  return (
    <div className="min-h-screen px-8 py-6 bg-[#111827] text-white">
      <h1 className="text-3xl font-bold mb-6 glow">Welcome to Anonymous Chatrooms</h1>

      <div className="mb-6">
        <button
          onClick={goToCreateChannel}
          className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded font-semibold"
        >
          + Create New Channel
        </button>
      </div>

      <div className="space-y-3">
        {channels.length === 0 ? (
          <p>No public channels found.</p>
        ) : (
          channels.map((channel) => (
            <div
              key={channel.channelId}
              className="flex justify-between items-center bg-gray-900 p-4 rounded"
            >
              <span className="font-medium">{channel.name}</span>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                onClick={() => enterChannel(channel.channelId)}
              >
                Enter
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Channels;
