import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../services/todo.service";
import {TodoModel} from "../../models/todo.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  addForm : FormGroup;

  get subTodos() : FormArray {
    return this.addForm.get('subTodos') as FormArray;
  }


  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.refreshForm();
  }


  handleSubmit(value: any) {
    this.todoService.addTodo(Object.assign(new TodoModel(), value));
    this.refreshForm();
    this.router.navigate(['']);
  }

  refreshForm()
  {
    this.addForm = new FormGroup({
      id: new FormControl(this.todoService.getNextId()),
      title: new FormControl('',[Validators.required,
        Validators.minLength(3)]),
      subTodos: new FormArray([])
    });
  }

  addSubTodo()
  {
    this.subTodos.push(new FormGroup({
      id: new FormControl(this.todoService.getNextId()),
      title: new FormControl('',[Validators.required,
        Validators.minLength(3)])
    }))
  }

  removeSubTodo(index: number) {
    this.subTodos.removeAt(index);
  }

  getErrorMessage() {
    if (this.addForm.controls.title.hasError('required'))
      return 'Title is required';
    else if (this.addForm.controls.title.hasError('minlength'))
      return 'Min length must be gr. than 3';
    else if(this.subTodos.length > 0) {
      if ((!this.subTodos.controls
          .every(control => !(control as FormGroup).controls['title'].hasError('required'))))
        return 'Sub todo title is required';
      if ((!this.subTodos.controls
          .every(control => !(control as FormGroup).controls['title'].hasError('minlength'))))
        return 'Sub todo min length must be gr. than 3';
    }
  }
}
