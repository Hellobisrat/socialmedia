import { useState, useEffect } from "react";
import axios from "../../utils/instance";
import CreatePost from "../../components/posts/CreatePost";
import PostCard from "../../components/posts/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  // Load posts from backend
  useEffect(() => {
    const loadPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };
    loadPosts();
  }, []);

  // Create post
  const handleCreatePost = async ({ text, media }) => {
    const form = new FormData();
    form.append("text", text);
    if (media) form.append("media", media);

    const res = await axios.post("/posts", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setPosts((prev) => [res.data, ...prev]);
  };

  // Like post
  const handleLike = async (postId) => {
    const res = await axios.put(`/posts/${postId}/like`);
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, likes: res.data.likes, liked: res.data.liked }
          : p
      )
    );
  };

  // Comment on post
  const handleComment = async (postId, text) => {
    const res = await axios.post(`/posts/${postId}/comment`, { text });
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, comments: [...p.comments, res.data] }
          : p
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto">
      <CreatePost onSubmit={handleCreatePost} />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}
    </div>
  );
}
