import { useEffect, useState } from "react";
import axios from "../../utils/instance";
import MessageBubble from "./MessageBubble";
import { useAuth } from "../../context/AuthContext";

export default function ChatWindow({ conversation }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!conversation) return;

    const loadMessages = async () => {
      const res = await axios.get(`/messages/${conversation._id}`);
      setMessages(res.data);
    };

    loadMessages();
  }, [conversation]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await axios.post("/messages", {
      receiverId: conversation.participants.find((p) => p._id !== user._id)._id,
      text,
    });

    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  if (!conversation)
    return <div className="flex-1 flex items-center justify-center">Select a chat</div>;

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3 bg-white">
        <img
          src={
            conversation.participants.find((p) => p._id !== user._id).avatar
          }
          className="w-10 h-10 rounded-full"
        />
        <p className="font-semibold">
          {conversation.participants.find((p) => p._id !== user._id).username}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m) => (
          <MessageBubble key={m._id} message={m} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
