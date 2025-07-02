import { useNavigate } from "react-router-dom";
import { getAuthUser, logout } from "../utils/auth";

const user = getAuthUser();
const Navbar = () => {
  
  const navigate = useNavigate();

  return (
    <nav className="w-full px-6 py-4 bg-[#1f2937] text-white flex justify-between items-center shadow-md">
      <h1
        className="text-xl font-bold tracking-wide glow cursor-pointer hover:text-pink-500 transition"
        onClick={() => navigate("/")}
      >
        TalkItOut
      </h1>

      <div>
        <span
          className="text-sm text-gray-300 hover:text-white cursor-pointer transition"
          onClick={() => navigate("/profile")}
        >
        {user.username}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;