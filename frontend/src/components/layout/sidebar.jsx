import { Home, User, MessageCircle, Bell } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", icon: <Home size={20} />, path: "/" },
  { name: "Profile", icon: <User size={20} />, path: "/profile" },
  { name: "Messages", icon: <MessageCircle size={20} />, path: "/chat" },
  { name: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-full p-4 hidden md:block">
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
} 