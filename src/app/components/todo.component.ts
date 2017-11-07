

import {Component, EventEmitter, Input, Output} from "@angular/core";
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
  @Input() edited: boolean;
  @Output() editedChange = new EventEmitter<boolean>();
  @Input() active: boolean;

  toggleEdit() {
    if (this.active) {
      this.edited = !this.edited;
      this.editedChange.emit(this.edited);
    }
  }

  toggleComplete() {
    this.todo.toggleComplete();
  }
}
