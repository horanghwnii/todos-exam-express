import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import todosModel from './todos.model';

class TodosService {
  getTodos(req: Request, res: Response) {
    const todos = todosModel.findMany();

    res.json(todos);
  }

  getTodo(req: Request, res: Response) {
    const todoId = Number(req.params.todoId);
    const todo = todosModel.findUnique(todoId);

    res.json(todo);
  }

  postCreateTodo(req: Request, res: Response) {
    const { title, completed } = req.body;
    const newTodo = {
      id: uuid(),
      userId: 1,
      title,
      completed,
    };
    todosModel.create(newTodo);

    res.send();
  }

  update(req: Request, res: Response) {
    const targetId = req.params.todoId;
    const { title, completed } = req.body;

    todosModel.update(targetId, title, completed);

    res.send();
  }

  delete(req: Request, res: Response) {}
}

const todosService = new TodosService();

export default todosService;
