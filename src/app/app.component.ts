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

  toggleTodoComplete(id: number)
  {
    let index = this.todoList.findIndex(todo => todo.id === id);
    this.todoList[index].complete = !this.todoList[index].complete;
  }

  ngOnInit() {
    this.todoList = this.todoService.getTodoList();
  }

}
