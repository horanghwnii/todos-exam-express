import { Router } from 'express';
import authController from './auth/auth.controller';
import todosController from './todos/todos.controller';

const controllers = Router();

controllers.use('/auth', authController);
controllers.use('/todos', todosController);

export default controllers;
