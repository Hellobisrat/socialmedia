import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Like from "../models/Like.js";

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { caption, media, hashtags, mentions, taggedUsers, privacy } = req.body;

    const post = await Post.create({
      user: req.user._id,
      caption,
      media,
      hashtags,
      mentions,
      taggedUsers,
      privacy
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE POST
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("user", "username avatar")
      .populate("taggedUsers", "username avatar")
      .populate("mentions", "username avatar");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER POSTS
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ user: userId, isDeleted: false })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET FEED POSTS (FOLLOWING USERS)
export const getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      user: { $in: [...user.following, req.user._id] },
      isDeleted: false
    })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Post.findByIdAndUpdate(
      postId,
      { $set: req.body },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE POST (SOFT DELETE)
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.isDeleted = true;
    await post.save();

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH POSTS BY HASHTAG
export const searchByHashtag = async (req, res) => {
  try {
    const { tag } = req.params;

    const posts = await Post.find({
      hashtags: { $regex: tag, $options: "i" },
      isDeleted: false
    })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};