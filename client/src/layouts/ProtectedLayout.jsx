import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white">
      <Navbar />
      <main className="flex-1 px-4 sm:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
