import { useEffect, useState } from "react";
import axios from "../../utils/instance";
import NotificationItem from "./Notification";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await axios.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.log("Failed to load notifications");
      }
    };

    loadNotifications();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications yet.</p>
      )}

      {notifications.map((n) => (
        <NotificationItem key={n._id} n={n} />
      ))}
    </div>
  );
}
