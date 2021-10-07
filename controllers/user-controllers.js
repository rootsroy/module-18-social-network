const { User, Post } = require("../models/index");

const userController = {
  // GET ALL USERS
  getAllUsers(req, res) {
    User.find({})
      .populate({ path: "posts", select: "-__v" })
      .populate({ path: "friends", select: "-__v -posts" })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  // GET SINGLE USER BY _ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({ path: "posts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID" });
          return;
        }
        return res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  // CREATE USER BY _ID
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // UPDATE USER BY _ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found " });
          return;
        }
        return res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // DELETE USER BY _ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found " });
          return;
        }
        return Post.deleteMany({ userId: params.id });
      })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  },
  //   ADD FRIEND
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        return res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // DELETE FRIENDS
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
