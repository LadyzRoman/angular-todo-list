import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  todos = [];

  addNew() {
    this.todos[this.todos.length] = {title: '', active: true, edit: true};
  }

  delElement(todo: any) {
    this.todos = this.todos.filter( e => e !== todo);
  }
}
