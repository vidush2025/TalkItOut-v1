const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-[#1f2937] text-white flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide glow">AnonChat</h1>
      <div>
        {/* Future: Add avatar, dropdown, logout etc. */}
        <span className="text-sm text-gray-300">AnonymousUser</span>
      </div>
    </nav>
  );
};

export default Navbar;
