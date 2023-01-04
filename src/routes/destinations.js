const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const destController = require("../controllers/destinations");
const {protect} = require('../authMiddleware');

// CREATE
// [post] : /v1/destination/post
router.post("/post", [
    body("title").isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
    body("description").isLength({ min: 5 }).withMessage('Input description tidak sesuai')
  ],protect,
  destController.createDest
);
router.get("/posts", destController.getAllDest)
router.get('/post/:postId', protect, destController.getDestById);
router.put('/post/:postId', [
  body("title").isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
  body("description").isLength({ min: 5 }).withMessage('Input description tidak sesuai')
],
protect, destController.updateDest);
router.delete('/post/:postId', protect, destController.deleteDest);



module.exports = router;
