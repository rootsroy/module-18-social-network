const { Post, User } = require("../models");

const postController = {
  // get all posts
  getAllPosts(req, res) {
    Post.find({})
      .select("-__v")
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },

  getPostById({ params }, res) {
    Post.findOne({ _id: params.postId })
      .select("-__v")
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found" });
        }
        return res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },

  addPost({ params, body }, res) {
    Post.create({
      postText: body.postText,
      username: body.username,
      userId: params.userId,
    })
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $addToSet: { posts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found " });
          return;
        }
        return res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  updatePost({ params, body }, res) {
    Post.findOneAndUpdate({ _id: params.postId }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  deletePost({ params }, res) {
    Post.findOneAndDelete({ _id: params.postId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found " });
          return;
        }
        return res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = postController;

