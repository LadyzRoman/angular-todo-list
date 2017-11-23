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
  @Output() todoClicked: EventEmitter<number> = new EventEmitter<number>();
  edited: number = -1;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  todoClick(id: number)
  {
    if (this.edited !== id) {
      this.edited = -1;
      this.todoClicked.emit(id);
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
}
