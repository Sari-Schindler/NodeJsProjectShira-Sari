import { GenericService } from '../service/genericService.js'
import { getTodoByConditionQuery, getTodoByIdQuery, addTodoQuery, deleteTodoQuery, updateTodoQuery } from '../service/queryTodo.js'

export class TodoController {
    
    async getTodos(req, res, next) {
        try {
            const todoService = new GenericService();
            const queryParams = req.query;
            const resultItems = await todoService.get(queryParams, getTodoByConditionQuery);
            return res.status(200).json(resultItems);
        } 
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getTodoById(req, res) {
        try {
            const todoService = new GenericService();
            const resultItem = await todoService.getById(req.params.id, getTodoByIdQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addTodo(req, res) {
        try {
            const todoService = new GenericService();
            const resultItem = await todoService.add(req.body, addTodoQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteTodo(req, res) {
        try {
            const todoService = new GenericService();
            await todoService.delete(req.params.id, deleteTodoQuery);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateTodo(req, res) {
        try {
            const todoService = new GenericService();
            await todoService.update(req.body, req.params.id, updateTodoQuery);
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