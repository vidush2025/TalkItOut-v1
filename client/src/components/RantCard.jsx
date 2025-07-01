import { FaTrashAlt, FaStar } from "react-icons/fa";

const RantCard = ({ rant, onDelete, isPremium = false }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white flex flex-col gap-2 relative">
      {isPremium && (
        <div className="absolute top-2 right-2 text-yellow-400">
          <FaStar title="Premium Rant" />
        </div>
      )}

      {rant.content && <p>{rant.content}</p>}

      {rant.voiceUrl && (
        <audio controls className="mt-2 w-full">
          <source src={rant.voiceUrl} type="audio/mpeg" />
        </audio>
      )}

      <button
        onClick={() => onDelete(rant._id)}
        className="mt-3 bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded self-end"
      >
        <FaTrashAlt className="inline mr-1" />
        Delete
      </button>
    </div>
  );
};

export default RantCard;
