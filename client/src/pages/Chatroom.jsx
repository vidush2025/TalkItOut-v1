import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { socket } from "../sockets/socket.js";

const Chatroom = () => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [voice, setVoice] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUserId = JSON.parse(localStorage.getItem("auth"))?._id;

    useEffect(() => {
        socket.on("recieve-message", (newMsg) => {
            setMessages((prev) => [...prev, newMsg]);
        });

        return () => socket.off("recieve-message");
        }, []);

    useEffect(() => {
        if (channelId) {
            socket.emit("join-room", channelId);
        }

        return () => {
            socket.emit("leave-room", channelId);
        };
        }, [channelId]);




  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/messages/${channelId}`, {
        withCredentials: true
      });
      setMessages(res.data.data || []);
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  };

  const handleSendMessage = async () => {
    if (!content && !voice) return;

    const formData = new FormData();
    formData.append("channelId", channelId);
    if (content) formData.append("content", content);
    if (voice) formData.append("voice", voice);

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/messages`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });
      setContent("");
      setVoice(null);
      setMessages((prev) => [...prev, res.data.data]);
    } catch (error) {
      alert("Failed to send message.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [channelId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    return (
    <div className="min-h-screen flex flex-col bg-[#1c0449] text-white">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-3">
        {messages.map((msg, index) => {
            const isMe = msg.senderId === currentUserId;
            return (
            <div
                key={index}
                className={`max-w-sm px-4 py-2 rounded-2xl ${
                isMe
                    ? "self-end bg-blue-600 text-white"
                    : "self-start bg-gray-800 text-gray-100"
                }`}
            >
                {msg.content && <p className="text-sm">{msg.content}</p>}
                {msg.voiceUrl && (
                <audio controls src={msg.voiceUrl} className="mt-2 w-full" />
                )}
            </div>
            );
        })}
        <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 bg-[#161b22] flex gap-3 items-center">
        <input
            type="text"
            placeholder="Type your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-[#0d1117] border border-gray-700 focus:outline-none"
        />
        <input
            type="file"
            accept="audio/*"
            onChange={(e) => setVoice(e.target.files[0])}
            className="text-sm text-gray-400"
        />
        <button
            onClick={handleSendMessage}
            disabled={!content && !voice}
            className={`px-4 py-2 rounded text-white ${
                content || voice ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-600 cursor-not-allowed"
            }`}
            >
            Send
        </button>
        </div>
    </div>
    );
}

export default Chatroom;
