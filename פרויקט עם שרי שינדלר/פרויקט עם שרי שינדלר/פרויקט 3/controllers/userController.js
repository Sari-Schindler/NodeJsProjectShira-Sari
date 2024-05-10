import { GenericService } from '../service/genericService.js'
import { getUserByIdQuery, getUserByConditionQuery, addUserQuery, deleteUserQuery, updateUserQuery } from '../service/queryUser.js'
import { getPostByConditionQuery, deletePostQuery } from '../service/queryPost.js'
import { getTodoByConditionQuery, deleteTodoQuery } from '../service/queryTodo.js'

export class UserController {

    async getUsers(req, res, next) {
        try {
            const userService = new GenericService();
            const queryParams = req.query;
            const resultItems = await userService.get(queryParams, getUserByConditionQuery);
            return res.status(200).json(resultItems);
        } 
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    
    async getUserById(req, res, next) {
        try {
            const userService = new GenericService();
            const resultItem = await userService.getById(req.params.id, getUserByIdQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addUser(req, res, next) {
        try {
            const userService = new GenericService();
            const resultItem = await userService.add(req.body, addUserQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteUser(req, res) {
        try {
            const userService = new GenericService();
            let postsArray = await userService.get({
                userId: req.params.id
            }, [req.params.id], getPostByConditionQuery);
            for (const post of postsArray) {
                await userService.delete(post.id, deletePostQuery);
            }
            let todosArray = await userService.get({
                userId: req.params.id
            }, [req.params.id], getTodoByConditionQuery);
            for (const todo of todosArray) {
                await userService.delete(todo.id, deleteTodoQuery);
            }
            await userService.delete(req.params.id, deleteUserQuery);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res) {
        try {
            const userService = new GenericService();
            await userService.update(req.body, req.params.id, updateUserQuery);
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