import { Search, Bell, MessageCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect,useState } from "react";
import axios from "../../utils/instance";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
const [notifications, setNotifications] = useState([]);
const [unreadMessages, setUnreadMessages] = useState(0);

const [unreadNotifications, setUnreadNotifications] = useState(0);

useEffect(() => {
  const loadUnread = async () => {
    const res = await axios.get("/notifications/unread/count");
    setUnreadNotifications(res.data.count);
  };
  loadUnread();
}, []);


  
useEffect(() => {
  const loadNotifications = async () => {
    try {
      const res = await axios.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.log("Failed to load notifications");
    }
  };


  loadNotifications();
}, []);

useEffect(() => {
  const loadUnread = async () => {
    try {
      const res = await axios.get("/messages/unread");
      setUnreadMessages(res.data.count);
    } catch (err) {
      console.log("Failed to load unread messages");
    }
  };

  loadUnread();
}, []);



  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 
        className="text-xl font-bold text-primary cursor-pointer"
        onClick={() => navigate("/")}
      >
        SocialApp
      </h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm"
          />
        </div>

        {/* Notifications */}
        <button onClick={() => navigate("/notifications")} className="hover:text-primary relative">
          <Bell size={22} />
          {/* Unread badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </button><button onClick={() => navigate("/notifications")} className="hover:text-primary relative">
  <Bell size={22} />
{unreadNotifications > 0 && (
  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
    {unreadNotifications}
  </span>
)}


</button>


        {/* Messages */}
        <button onClick={() => navigate("/chat")} className="hover:text-primary relative">
  <MessageCircle size={22} />

  {unreadMessages > 0 && (
    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-1 rounded-full">
      {unreadMessages}
    </span>
  )}
</button>


        {/* Profile */}
        <button onClick={() => navigate(`/profile/${user?._id}`)} className="hover:text-primary">
          <User size={22} />
        </button>
      </div>
    </nav>
  );
}
