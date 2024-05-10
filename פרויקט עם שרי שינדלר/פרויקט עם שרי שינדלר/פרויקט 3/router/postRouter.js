import express from "express";
import { PostController } from '../controllers/postController.js'
const postRouter = express.Router();

const postcontroller = new PostController();

postRouter.get('/', postcontroller.getPosts)
postRouter.get("/:id", postcontroller.getPostById)
postRouter.post("/", postcontroller.addPost)
postRouter.delete("/:id", postcontroller.deletePost)
postRouter.put("/:id", postcontroller.updatePost)

export{
    postRouter
}