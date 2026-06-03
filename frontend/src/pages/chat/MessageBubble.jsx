import { useAuth } from "../../context/AuthContext";

export default function MessageBubble({ message }) {
  const { user } = useAuth();
  const isMine = message.sender === user._id;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-xs ${
          isMine ? "bg-primary text-white" : "bg-gray-200"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
