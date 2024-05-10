import express from "express";
import { PasswordController } from '../controllers/passwordController.js'
const passwordRouter = express.Router();

const passwordcontroller = new PasswordController();

passwordRouter.post("/", passwordcontroller.addPassword);
passwordRouter.post("/checkPassword", passwordcontroller.checkPassword);
passwordRouter.delete('/:id', passwordcontroller.deletePassword);
passwordRouter.put("/:id", passwordcontroller.updatePassword)

export{
    passwordRouter
}