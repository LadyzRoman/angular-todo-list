import {Component, OnInit} from '@angular/core';
import {TodoModel} from "./models/todo.model";
import {HostListener} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  todos: TodoModel[] = [];
  active: number;
  edited: boolean;
  globalIndex: number;

  addNew() {
    this.todos.unshift(new TodoModel(this.globalIndex++ , '', false));
    this.active = this.globalIndex - 1;
    this.edited = true;
  }

  delElement(todo: TodoModel) {
    this.todos = this.todos.filter( t => t !== todo);
    this.active = -1;
  }

  @HostListener('window:beforeunload')
  saveData()
  {
      sessionStorage.setItem('todoList', JSON.stringify(this.todos));
      sessionStorage.setItem('active', this.active.toString());
      sessionStorage.setItem('globalIndex', this.globalIndex.toString());
  }

  ngOnInit() {
    this.todos = <TodoModel[]>JSON.parse(sessionStorage.getItem('todoList')) || [];
    for (let i = 0; i < this.todos.length; i++)
    {
      let todo = this.todos[i];
      this.todos[i] = new TodoModel(todo.id, todo.title, todo.complete);
    }
    this.globalIndex = parseInt(sessionStorage.getItem('globalIndex'), 10) || 0;
    this.active = parseInt(sessionStorage.getItem('active'), 10) || 0;

  }

  editElement() {
    this.edited = true;
  }

  activateElement(todo: TodoModel) {
    if (this.active === todo.id) return;
    this.active = todo.id;
    this.edited = false;
  }
}
