import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoModel} from "../../models/todo.model";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todoList: Array<TodoModel>;
  edited: number = null;
  active: number = null;


  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  todoClick(id: number)
  {
    if (this.edited !== id) {
      this.edited = null;

      if (this.todoService.isSubTodosComplete(id))
        this.todoService.toggleComplete(id);
    }
  }

  toggleEdit(id: number, event: Event)
  {
    if (event)
      event.stopPropagation();

    if (this.edited !== id) {
      this.edited = id;
    }
    else
      this.edited = null;
  }

  deleteElement(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggleSubTodos(id: number, event: Event) {
    event.stopPropagation();
    if (this.active !== id) {
      this.edited = null;
      this.active = id;
    }
    else
    {
      this.active = null;
      this.edited = null;
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
