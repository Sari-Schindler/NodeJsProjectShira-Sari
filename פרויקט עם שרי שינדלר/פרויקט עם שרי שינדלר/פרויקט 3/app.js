import express from 'express';
import cors from 'cors';
import { userRouter } from './router/userRouter.js'
import { postRouter } from './router/postRouter.js'
import { todoRouter } from './router/todoRouter.js'
import { commentRouter } from './router/commentRouter.js'
import { passwordRouter } from './router/passwordRouter.js'
import {logErrors} from './middleware/logError.js'
const app = express();
app.use(cors());

app.use(express.json());
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/todos', todoRouter);
app.use('/comments', commentRouter);
app.use('/passwords', passwordRouter);

app.use(logErrors);


app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});
