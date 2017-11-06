

import {Component, Input} from "@angular/core";
import {Todo} from "./shared/Todo";

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  @Input() todo: Todo;

  toggleEdit() {
    this.todo.toggleEdit();
  }
}
