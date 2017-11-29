import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoModel} from "../../models/todo.model";
import {TodoService} from "../../services/todo.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: Array<TodoModel>;
  active: number = null;

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.todoList = this.todoService.getTodoList();
  }

  todoClick(id: number)
  {
    if (this.todoService.isSubTodosComplete(id))
      this.todoService.toggleComplete(id);
  }

  toggleEdit(id: number, event: Event)
  {
    if (event)
      event.stopPropagation();
    this.router.navigate(['/edit', id]);
  }

  deleteElement(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggleSubTodos(id: number, event: Event) {
    event.stopPropagation();
    if (this.active !== id) {
      this.active = id;
    }
    else
    {
      this.active = null;
    }
  }

  switchSubTodoStatus(id: number, event: Event) {
    event.stopPropagation();

    if (this.todoService.getTodoById(this.active).complete) return;

    let todo = this.todoService.getTodoById(this.active);
    let subTodoIndex = todo.subTodos.findIndex(todo => todo.id === id);
    todo.subTodos[subTodoIndex].complete = !todo.subTodos[subTodoIndex].complete;
  }

  hasSubTodos(id: number)
  {
    return this.todoService.hasSubTodos(id);
  }

  isSubTodosComplete(id: number)
  {
    return this.todoService.isSubTodosComplete(id);
  }

}
