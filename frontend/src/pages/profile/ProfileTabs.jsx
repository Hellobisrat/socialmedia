import { Grid, User, Users, Heart } from "lucide-react";

export default function ProfileTabs({ active, onChange }) {
  const tabs = [
    { id: "posts", label: "Posts", icon: <Grid size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "followers", label: "Followers", icon: <Users size={18} /> },
    { id: "following", label: "Following", icon: <Heart size={18} /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 flex-1 justify-center py-3 text-sm font-medium transition ${
              active === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}