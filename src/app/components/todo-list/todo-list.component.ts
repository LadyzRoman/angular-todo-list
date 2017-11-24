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
  edited: number = -1;
  active: number = -1;


  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  todoClick(id: number)
  {
    if (this.edited !== id) {
      this.edited = -1;

      let todo = this.todoService.getTodoById(id);
      if (todo.isSubTodosComplete())
        todo.complete = !todo.complete;
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
      this.edited = -1;
  }

  deleteElement(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggleSubTodos(id: number, event: Event) {
    event.stopPropagation();
    if (this.active !== id) {
      this.edited = -1;
      this.active = id;
    }
    else
    {
      this.active = -1;
      this.edited = -1;
    }
  }

  switchSubTodoStatus(id: number, event: Event) {
    event.stopPropagation();

    if (this.todoService.getTodoById(this.active).complete) return;

    let todo = this.todoService.getTodoById(this.active);
    let subTodoIndex = todo.subTodos.findIndex(todo => todo.id === id);
    todo.subTodos[subTodoIndex].complete = !todo.subTodos[subTodoIndex].complete;
  }
}
