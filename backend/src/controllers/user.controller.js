import User from "../models/User.js";
import Post from "../models/Post.js";
import Follow from "../models/Follow.js";

// GET PUBLIC PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ user: userId, isDeleted: false }).sort({
      createdAt: -1,
    });

    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE AVATAR
export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE COVER PHOTO
export const updateCover = async (req, res) => {
  try {
    const { cover } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { cover },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH USERS
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).select("username avatar");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SUGGEST USERS TO FOLLOW
export const suggestUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const following = await Follow.find({
      follower: userId,
      isActive: true,
    }).select("following");

    const followingIds = following.map((f) => f.following.toString());

    const suggestions = await User.find({
      _id: { $nin: [...followingIds, userId] },
    })
      .limit(10)
      .select("username avatar");

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ACCOUNT (SOFT DELETE)
export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isDeleted = true;
    await user.save();

    res.json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};