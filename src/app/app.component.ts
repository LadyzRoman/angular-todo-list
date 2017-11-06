import {Component, OnInit} from '@angular/core';
import {Todo} from "./shared/Todo";
import {HostListener} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  todos: Todo[] = [];

  addNew() {
    this.todos.forEach(t => t.edit = false);
    this.todos.unshift(new Todo('', true));
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
    this.todos = JSON.parse(sessionStorage.getItem('todoList'));
    if (this.todos == null)
      this.todos = [];
  }
}
