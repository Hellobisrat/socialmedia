import { useState } from "react";
import { Send } from "lucide-react";

export default function Comments({ comments = [], onAddComment }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text);
    setText("");
  };

  return (
    <div className="mt-3">
      {/* Comments List */}
      <div className="space-y-2">
        {comments.map((c) => (
          <div key={c._id} className="flex items-start gap-2">
            <img
              src={c.user.avatar}
              alt="avator"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="bg-gray-100 px-3 py-2 rounded-lg">
              <p className="text-sm">
                <span className="font-semibold">{c.user.username}</span>{" "}
                {c.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex items-center gap-2 mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-3 py-2 rounded-lg"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
