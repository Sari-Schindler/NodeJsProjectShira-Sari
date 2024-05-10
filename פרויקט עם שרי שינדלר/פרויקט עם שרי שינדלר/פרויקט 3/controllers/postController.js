import { GenericService } from '../service/genericService.js'
import { getPostByConditionQuery, getPostByIdQuery, addPostQuery, deletePostQuery, updatePostQuery } from '../service/queryPost.js'
import { deleteCommentQuery, getCommentByConditionQuery } from '../service/queryComment.js'

export class PostController {
    
    async getPosts(req, res) {
        try {
            const postService = new GenericService();
            const queryParams = req.query;
            const resultItems = await postService.get(queryParams, getPostByConditionQuery);
            return res.status(200).json(resultItems);
        } 
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getPostById(req, res) {
        try {
            const postService = new GenericService();
            const resultItem = await postService.getById(req.params.id, getPostByIdQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addPost(req, res) {
        try {
            const postService = new GenericService();
            const resultItem = await postService.add(req.body, addPostQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deletePost(req, res, next) {
        try {
            const postService = new GenericService();
            let commentsArray = await postService.get({
                postId: req.params.id
            }, [req.params.id], getCommentByConditionQuery);
            for (const comment of commentsArray) {
                await postService.delete(comment.id, deleteCommentQuery);
            }
            await postService.delete(req.params.id, deletePostQuery);
            res.status(200).json({ status: 200, data: req.params.id });
        } catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async updatePost(req, res) {
        try {
            const postService = new GenericService();
            await postService.update(req.body, req.params.id, updatePostQuery);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}