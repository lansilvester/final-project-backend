const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const destController = require("../controllers/destinations");

// CREATE
// [post] : /v1/destination/post
router.post("/post", [
    body("title").isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
    body("description").isLength({ min: 5 }).withMessage('Input description tidak sesuai')
  ],
  destController.createDest
);
router.get("/posts", destController.getAllDest)
router.get('/post/:postId', destController.getDestById);
router.put('/post/:postId', [
  body("title").isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
  body("description").isLength({ min: 5 }).withMessage('Input description tidak sesuai')
],
destController.updateDest);
router.delete('/post/:postId', destController.deleteDest);



module.exports = router;
