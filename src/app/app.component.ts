import {Component, OnInit} from '@angular/core';
import {TodoModel} from "./models/todo.model";
import {HostListener} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  todos: TodoModel[] = [];

  addNew() {
    this.todos.forEach(t => t.edit = false);
    this.todos.forEach(t => t.active = false);
    let todo = new TodoModel('', true, false, false);
    todo.active = true;
    this.todos.unshift(todo);
  }

  delElement(todo: {title: string, edit: boolean}) {
    this.todos = this.todos.filter( t => t !== todo);
  }

  @HostListener('window:beforeunload')
  saveData()
  {
      sessionStorage.setItem('todoList', JSON.stringify(this.todos));
  }

  ngOnInit() {
    this.todos = <TodoModel[]>JSON.parse(sessionStorage.getItem('todoList'));
    if (this.todos == null)
      this.todos = [];
    for (let i = 0; i < this.todos.length; i++)
    {
      let todo = this.todos[i];
      this.todos[i] = new TodoModel(todo.title, todo.edit, todo.active, todo.complete);
    }
  }

  editElement(todo: TodoModel) {
    this.todos.forEach(t => t.edit = false);
    todo.edit = true;
  }

  activateElement(todo: TodoModel) {
    if (todo.active) return;
    this.todos.forEach(t => {t.edit = false; t.active = false; });
    todo.active = true;
  }
}
