import fs from 'fs/promises';
import todos from '../../data/todos.json';
import { Todo } from '../../types/todo.type';
import { TodoDto } from './todos.dto';

class TodosModel {
  findMany() {
    return todos;
  }

  findUnique(todoId: number) {
    const targetTodo = todos.find((todo) => todo.id === todoId);
    return targetTodo;
  }

  async create(dto: TodoDto) {
    const todos = await fs
      .readFile('./src/data/todos.json', { encoding: 'utf8' })
      .then((text) => JSON.parse(text));

    todos.push(dto);

    const stringifiedNewTodos = JSON.stringify(todos);

    await fs.writeFile('./src/data/todos.json', stringifiedNewTodos, {
      encoding: 'utf8',
    });
  }

  async update(id: number | string, title: string, completed: string) {
    const todos = await fs
      .readFile('./src/data/todos.json', { encoding: 'utf8' })
      .then((text) => JSON.parse(text) as Todo[]);

    let todoId = isNaN(Number(id)) ? id : Number(id);

    todos.forEach((todo) => {
      if (todo.id === todoId) {
        todo.title = title;
        todo.completed = Boolean(completed);
      }
    });

    const stringifiedNewTodos = JSON.stringify(todos);

    await fs.writeFile('./src/data/todos.json', stringifiedNewTodos, {
      encoding: 'utf8',
    });
  }

  delete() {}
}

const todosModel = new TodosModel();

export default todosModel;
