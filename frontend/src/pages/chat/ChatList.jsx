import { useEffect, useState } from "react";
import axios from "../../utils/instance";
import { useAuth } from "../../context/AuthContext";

export default function ChatList({ onSelect }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const loadConversations = async () => {
      const res = await axios.get("/conversations");
      setConversations(res.data);
    };
    loadConversations();
  }, []);

  return (
    <div className="w-1/3 border-r h-full overflow-y-auto bg-white">
      <h2 className="p-4 font-bold text-lg border-b">Chats</h2>

      {conversations.map((c) => {
        const other = c.participants.find((p) => p._id !== user._id);
        return (
          <div
            key={c._id}
            onClick={() => onSelect(c)}
            className="p-4 flex items-center gap-3 hover:bg-gray-100 cursor-pointer border-b"
          >
            <img
              src={other.avatar}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold">{other.username}</p>
              <p className="text-sm text-gray-500 truncate">
                {c.lastMessage?.text || "No messages yet"}
              </p>
            </div>

            {c.unreadCount > 0 && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {c.unreadCount}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
