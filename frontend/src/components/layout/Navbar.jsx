import { Search, Bell, MessageCircle, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-primary">SocialApp</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm"
          />
        </div>

        <button className="hover:text-primary">
          <Bell size={22} />
        </button>

        <button className="hover:text-primary">
          <MessageCircle size={22} />
        </button>

        <button className="hover:text-primary">
          <User size={22} />
        </button>
      </div>
    </nav>
  );
}