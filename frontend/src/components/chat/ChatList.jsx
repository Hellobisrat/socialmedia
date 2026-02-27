import { Bell } from "lucide-react";

export default function NotificationItem({ n }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm mb-2">
      <Bell className="text-primary" />
      <div>
        <p className="font-medium">{n.message}</p>
        <p className="text-sm text-gray-500">{n.time}</p>
      </div>
    </div>
  );
}