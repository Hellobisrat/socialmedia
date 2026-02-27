import Follow from "../models/Follow.js";
import User from "../models/User.js";

export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user._id;

    if (userId === followerId.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: userId,
    });

    if (existingFollow) {
      if (!existingFollow.isActive) {
        existingFollow.isActive = true;
        await existingFollow.save();
      }
      return res.json({ message: "Already following" });
    }

    await Follow.create({
      follower: followerId,
      following: userId,
    });

    await User.findByIdAndUpdate(followerId, {
      $addToSet: { following: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { followers: followerId },
    });

    res.status(201).json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user._id;

    const followRecord = await Follow.findOne({
      follower: followerId,
      following: userId,
    });

    if (!followRecord) {
      return res.status(400).json({ message: "You are not following this user" });
    }

    followRecord.isActive = false;
    await followRecord.save();

    await User.findByIdAndUpdate(followerId, {
      $pull: { following: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { followers: followerId },
    });

    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await Follow.find({
      following: userId,
      isActive: true,
    }).populate("follower", "username avatar");

    res.json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const following = await Follow.find({
      follower: userId,
      isActive: true,
    }).populate("following", "username avatar");

    res.json(following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};