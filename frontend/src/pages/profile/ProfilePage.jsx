import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileTabs from "../../components/profile/ProfileTabs";
import axios from "../../utils/instance";
import { toast } from "sonner";

export default function ProfilePage() {
  const { id } = useParams(); // /profile/:id
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };

    const loadPosts = async () => {
      try {
        const res = await axios.get(`/posts/user/${id}`);
        setPosts(res.data);
      } catch (err) {
        toast.error("Failed to load posts");
      }
    };

    loadProfile();
    loadPosts();
  }, [id]);

  if (!user) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <ProfileHeader user={user} />
      <ProfileTabs posts={posts} />
    </div>
  );
}
