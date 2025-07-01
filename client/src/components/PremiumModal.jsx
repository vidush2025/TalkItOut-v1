const PremiumModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#120925] bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#182c57] text-white rounded-xl p-6 shadow-2xl w-80 relative border border-yellow-500">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-yellow-400">
          <span>⭐</span> Premium Coming Soon
        </h2>
        <p className="text-sm mb-4">
          🚀 AI-generated rants, smart sentiment analysis, and voice emotion detection are on their way!
        </p>
        <p className="text-xs text-gray-400">Stay tuned for exclusive updates!</p>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PremiumModal;
