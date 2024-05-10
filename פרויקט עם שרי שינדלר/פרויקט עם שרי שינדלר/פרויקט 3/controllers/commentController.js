import { GenericService } from '../service/genericService.js'
import { getCommentByConditionQuery, getCommentByIdQuery, addCommentQuery, deleteCommentQuery, updateCommentQuery } from '../service/queryComment.js'

export class CommentController {
    
    async getComments(req, res) {
        try {
            const commentService = new GenericService();
            const queryParams = req.query;
            const resultItems = await commentService.get(queryParams, getCommentByConditionQuery);
            return res.status(200).json(resultItems);
        } 
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getCommentById(req, res) {
        try {
            const commentService = new GenericService();
            const resultItem = await commentService.getById(req.params.id, getCommentByIdQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addComment(req, res) {
        try {
            const commentService = new GenericService();
            const resultItem = await commentService.add(req.body, addCommentQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteComment(req, res) {
        try {
            const commentService = new GenericService();
            await commentService.delete(req.params.id, deleteCommentQuery);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateComment(req, res) {
        try {
            const commentService = new GenericService();
            await commentService.update(req.body, req.params.id, updateCommentQuery);
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