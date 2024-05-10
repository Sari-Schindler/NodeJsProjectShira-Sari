import { GenericService } from '../service/genericService.js'
import { getPasswordByIdQuery, deletePasswordQuery, addPasswordQuery, updatePasswordQuery } from '../service/queryPassword.js'

import crypto from 'crypto';

export class PasswordController {
    
    hashPassword = async (password) => {
        try {
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw error;
        }
    }

    checkPassword = async (req, res, next) => {
        try {
            const passwordService = new GenericService();
            const usersPassword = await passwordService.getById(req.body.userId, getPasswordByIdQuery);
            let isOKPassword = false;
            if(usersPassword){
                const hashedPassword = await this.hashPassword(req.body.password);
                if(hashedPassword == usersPassword[0].password){
                    isOKPassword = true;
                }
            }
            res.status(200).json({ status: 200, isOKPassword: isOKPassword });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    addPassword = async (req, res, next) => {
        try {
            const passwordService = new GenericService();
            const hashedPassword = await this.hashPassword(req.body.password);
            req.body.password = hashedPassword;
            const resultItem = await passwordService.add(req.body, addPasswordQuery);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }
  
    async deletePassword(req, res) {
        try {
            const passwordService = new GenericService();
            await passwordService.delete(req.params.userId, deletePasswordQuery);
            res.status(200).json({ status: 200, data: req.params.userId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    updatePassword = async (req, res, next) => {
        try {
            const passwordService = new GenericService();
            const hashedPassword = await this.hashPassword(req.body.password);
            req.body.password = hashedPassword;
            await passwordService.update(req.body, req.params.id, updatePasswordQuery);
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