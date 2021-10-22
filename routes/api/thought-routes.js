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
//get all posts
router.route("/").get(getAllPosts);

///create post
router.route("/:userId").post(addPost);

router
  .route("/:userId/:postId") //1st userID and 2nd post Id
  .get(getPostById) //get one post
  .put(updatePost) //update post
  .delete(deletePost); //delete post

module.exports = router;
