

import {Injectable} from "@angular/core";
import {ITodo, TodoModel} from "../models/todo.model";

@Injectable()
export class TodoService
{
  todoList: Array<TodoModel> = [];
  initialId: number = 24332;

  constructor() {
  }

  getTodoList(): Array<TodoModel>
  {
    return this.todoList;
  }

  getTodoById(id: number): TodoModel
  {
    let index = this.todoList.findIndex(todo => todo.id === id);
    return this.todoList[index];
  }

  hasSubTodos(id: number)
  {
    return this.getTodoById(id).subTodos.length > 0;
  }

  isSubTodosComplete(id: number)
  {
    return this.getTodoById(id).subTodos.every(todo => todo.complete);
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

  getNextId()
  {
    return this.initialId++;
  }

  toggleComplete(id: number) {
    this.getTodoById(id).complete = !this.getTodoById(id).complete;
  }
}
