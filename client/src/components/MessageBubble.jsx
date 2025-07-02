const MessageBubble = ({ username, content, voiceUrl, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isOwn ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
        }`}
      >
        {!isOwn && username && (
          <p className="text-sm font-semibold text-pink-400 mb-1">{username}</p>
        )}

        {content && <p>{content}</p>}

        {voiceUrl && (
          <audio controls className="mt-2 w-full">
            <source src={voiceUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
