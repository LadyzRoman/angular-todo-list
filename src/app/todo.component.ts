

import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  @Input() title: string;
  active: boolean;
  @Input() edit: boolean;

  editEnd(value: string) {
    this.title = value;
    this.edit = false;
  }

  startEdit() {
    this.edit = true;
  }

}
