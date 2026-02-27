import { useState } from "react";
import { UserPlus, UserCheck } from "lucide-react";

export default function User({ user, onFollow, onUnfollow }) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollow = () => {
    if (isFollowing) {
      onUnfollow(user._id);
      setIsFollowing(false);
    } else {
      onFollow(user._id);
      setIsFollowing(true);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm mb-2">
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <p className="font-semibold">{user.username}</p>
          <p className="text-sm text-gray-500">{user.fullName}</p>
        </div>
      </div>

      <button
        onClick={handleFollow}
        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition ${
          isFollowing
            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
            : "bg-primary text-white hover:bg-blue-600"
        }`}
      >
        {isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />}
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}