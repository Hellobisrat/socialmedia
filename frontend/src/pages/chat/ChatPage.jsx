import { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

export default function ChatPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex h-[calc(100vh-70px)] bg-white rounded-xl shadow">
      <ChatList onSelect={setSelected} />
      <ChatWindow conversation={selected} />
    </div>
  );
}
