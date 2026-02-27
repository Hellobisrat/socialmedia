import { Settings, Camera } from "lucide-react";

export default function ProfileHeader({ user, onEditProfile, onChangeAvatar }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-4">
      <div className="flex items-center gap-6">
        
        {/* Avatar */}
        <div className="relative">
          <img
            src={user.avatar}
            className="w-28 h-28 rounded-full object-cover border"
          />
          <button
            onClick={onChangeAvatar}
            className="absolute bottom-1 right-1 bg-black/60 text-white p-1 rounded-full"
          >
            <Camera size={16} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-2xl font-bold">{user.username}</h2>

            <button
              onClick={onEditProfile}
              className="px-4 py-1 border rounded-lg hover:bg-gray-100"
            >
              Edit Profile
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Settings size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-3">
            <p>
              <span className="font-semibold">{user.posts}</span> posts
            </p>
            <p>
              <span className="font-semibold">{user.followers}</span> followers
            </p>
            <p>
              <span className="font-semibold">{user.following}</span> following
            </p>
          </div>

          {/* Bio */}
          <div>
            <p className="font-semibold">{user.fullName}</p>
            <p className="text-gray-700 whitespace-pre-line">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}