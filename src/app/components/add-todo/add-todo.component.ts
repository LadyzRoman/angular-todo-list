import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../services/todo.service";
import {TodoModel} from "../../models/todo.model";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  addForm : FormGroup;
  private initialId: number = 14681327;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      id: new FormControl(this.initialId++),
      title: new FormControl('',[Validators.required,
        Validators.minLength(3)])
    });
  }


  handleSubmit(value: any) {
    console.log(value);
    this.todoService.addTodo(Object.assign(new TodoModel(), value));
    //this.addForm.reset();

    this.addForm = new FormGroup({
      id: new FormControl(this.initialId++),
      title: new FormControl('',[Validators.required,
        Validators.minLength(3)])
    });
  }
}
