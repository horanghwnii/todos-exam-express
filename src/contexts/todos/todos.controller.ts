import { Router } from 'express';
import todosService from './todos.service';

const todosController = Router();

todosController.get('/', todosService.getTodos);
todosController.get('/:todoId', todosService.getTodo);
todosController.post('/', todosService.postCreateTodo);
todosController.put('/:todoId', todosService.postCreateTodo);

export default todosController;
