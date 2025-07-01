import { Star } from "lucide-react";

const PremiumBadge = () => (
  <div
    onClick={() => alert("AI Premium Feature Coming Soon!")}
    className="flex items-center gap-2 cursor-pointer text-yellow-400 hover:text-yellow-300 transition"
  >
    <Star className="w-5 h-5" />
    <span className="font-semibold">Premium</span>
  </div>
);

export default PremiumBadge;
