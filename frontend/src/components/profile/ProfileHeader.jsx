import { Heart, MessageCircle } from "lucide-react";
import Comments from "./Comments";
import { useState } from "react";

export default function PostCard({ post, onLike, onComment }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.user.avatar}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{post.user.username}</p>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
      </div>

      <p className="mb-3">{post.caption}</p>

      {post.media && (
        <img
          src={post.media}
          className="rounded-lg mb-3 max-h-[500px] w-full object-cover"
        />
      )}

      <div className="flex items-center gap-6 text-gray-600 mb-2">
        <button
          className="flex items-center gap-1 hover:text-primary"
          onClick={() => onLike(post._id)}
        >
          <Heart
            size={20}
            className={post.liked ? "text-red-500 fill-red-500" : ""}
          />
          {post.likes}
        </button>

        <button
          className="flex items-center gap-1 hover:text-primary"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={20} />
          {post.comments.length}
        </button>
      </div>

      {showComments && (
        <Comments
          comments={post.comments}
          onAddComment={(text) => onComment(post._id, text)}
        />
      )}
    </div>
  );
}