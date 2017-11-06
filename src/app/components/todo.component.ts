

import {Component, Input} from "@angular/core";
import {TodoModel} from "../models/todo.model";

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo.component.html',
  styleUrls: [
    './todo.component.css'
  ]
})
export class TodoComponent {
  @Input() todo: TodoModel;

  toggleEdit() {
    this.todo.toggleEdit();
  }

  toggleComplete() {
    this.todo.toggleComplete();
  }
}
