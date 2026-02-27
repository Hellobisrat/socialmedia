import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { postId, text, parentComment } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      post: postId,
      user: req.user._id,
      text,
      parentComment: parentComment || null,
    });

    // Increase comment count on post
    post.commentCount += 1;
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMMENTS FOR A POST
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username avatar")
      .populate("parentComment")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIKE / UNLIKE COMMENT
export const toggleLikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const userId = req.user._id;

    const alreadyLiked = comment.likes.includes(userId);

    if (alreadyLiked) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }

    await comment.save();

    res.json({
      message: alreadyLiked ? "Unliked comment" : "Liked comment",
      likes: comment.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT (SOFT DELETE)
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.isDeleted = true;
    comment.text = "This comment was deleted.";
    await comment.save();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};