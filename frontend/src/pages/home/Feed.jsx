import PostCard from "../../components/posts/PostCard";

export default function Feed() {
  const posts = [
    {
      _id: "1",
      user: { username: "bisrat", avatar: "/avatar.png" },
      caption: "My first post!",
      media: "/sample.jpg",
      likes: 10,
      comments: 3,
      time: "2h ago",
    },
  ];

  return (
    <div className="max-w-xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}