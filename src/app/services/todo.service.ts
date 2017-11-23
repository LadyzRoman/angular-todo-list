

import {Injectable} from "@angular/core";
import {ITodo, TodoModel} from "../models/todo.model";

@Injectable()
export class TodoService
{
  todoList: Array<TodoModel> = [];

  constructor() {
  }

  getTodoList(): Array<TodoModel>
  {
    return this.todoList;
  }

  deleteTodo(id: number)
  {
    let index = this.todoList.findIndex(todo => todo.id === id);
    this.todoList.splice(index, 1);
  }

  addTodo(todo: TodoModel)
  {
    this.todoList.unshift(todo);
  }

  updateTodo(todo: TodoModel)
  {
    let todoIndex = this.todoList.findIndex(t => t.id === todo.id);
    this.todoList[todoIndex] = todo;
  }
}
