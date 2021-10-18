const router = require("express").Router();
const {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllPosts);

router.route("/:userId").post(addPost);

router
  .route("/:userId/:postId")
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
