import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TodoService} from "./services/todo.service";
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {RouterModule} from "@angular/router";
import {EditDeactivateGuard} from "./services/edit-deactivate.guard";
import {AddDeactivateGuard} from "./services/add-deactivate.guard";

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    EditTodoComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: TodoListComponent
      },
      {
        path: 'add',
        component: AddTodoComponent,
        canDeactivate: [AddDeactivateGuard]
      },
      {
        path: 'edit',
        redirectTo: 'add'
      },
      {
        path: 'edit/:id',
        component: EditTodoComponent,
        canDeactivate: [EditDeactivateGuard]

      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  providers: [TodoService,
              EditDeactivateGuard,
              AddDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
