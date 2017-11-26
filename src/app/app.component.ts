import {Component, OnInit} from '@angular/core';
import {TodoModel} from "./models/todo.model";
import {TodoService} from "./services/todo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  todoList: Array<TodoModel> = [];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoList = this.todoService.getTodoList();
  }

}
