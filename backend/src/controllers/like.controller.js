import Like from "../models/Like.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// LIKE OR UNLIKE A POST
export const togglePostLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    let like = await Like.findOne({ user: userId, post: postId });

    if (like) {
      like.isActive = !like.isActive;
      await like.save();

      post.likeCount += like.isActive ? 1 : -1;
      await post.save();

      return res.json({
        message: like.isActive ? "Post liked" : "Post unliked",
        likeCount: post.likeCount,
      });
    }

    await Like.create({ user: userId, post: postId });
    post.likeCount += 1;
    await post.save();

    res.status(201).json({
      message: "Post liked",
      likeCount: post.likeCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIKE OR UNLIKE A COMMENT
export const toggleCommentLike = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    let like = await Like.findOne({ user: userId, comment: commentId });

    if (like) {
      like.isActive = !like.isActive;
      await like.save();

      if (like.isActive) {
        comment.likes.push(userId);
      } else {
        comment.likes.pull(userId);
      }

      await comment.save();

      return res.json({
        message: like.isActive ? "Comment liked" : "Comment unliked",
        likes: comment.likes.length,
      });
    }

    await Like.create({ user: userId, comment: commentId });
    comment.likes.push(userId);
    await comment.save();

    res.status(201).json({
      message: "Comment liked",
      likes: comment.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};