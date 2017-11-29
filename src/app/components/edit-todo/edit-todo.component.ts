import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoModel} from "../../models/todo.model";
import {TodoService} from "../../services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  editForm: FormGroup;
  _todo: TodoModel;

  set todo(todo: TodoModel)
  {
    this._todo = todo;
    this.refreshForm();
    todo.subTodos.forEach(subTodo => this.addSubTodo(subTodo));
  }

  get todo(): TodoModel
  {
    return this._todo;
  }

  constructor(private todoService: TodoService,
              private router: Router,
              private route: ActivatedRoute)
  {}

  ngOnInit() {
    let id: number = null;
    this.route.params
      .subscribe(params => id = params['id'] as number);
    this.todo = this.todoService.getTodoById(+id);
  }

  get subTodos() : FormArray {
    return this.editForm.get('subTodos') as FormArray;
  }

  refreshForm()
  {
    this.editForm = new FormGroup({
      id: new FormControl(this.todo.id),
      title: new FormControl(this.todo.title ,[Validators.required,
        Validators.minLength(3)]),
      subTodos: new FormArray([]),
    });
  }

  addSubTodo(subTodo?: TodoModel)
  {
    if (subTodo)
    {
      this.subTodos.push(new FormGroup({
        id: new FormControl(subTodo.id),
        title: new FormControl(subTodo.title,[Validators.required,
          Validators.minLength(3)]),
        complete: new FormControl(subTodo.complete)
      }));
    }
    else {
      this.subTodos.push(new FormGroup({
        id: new FormControl(this.todoService.getNextId()),
        title: new FormControl('',[Validators.required,
          Validators.minLength(3)])
      }));
    }
  }

  removeSubTodo(index: number) {
    this.subTodos.removeAt(index);
  }

  getErrorMessage() {
    if (this.editForm.controls.title.hasError('required'))
      return 'Title is required';
    else if (this.editForm.controls.title.hasError('minlength'))
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

  handleSubmit(value : any)
  {
    this.todo = Object.assign(new TodoModel(), value);
    this.todoService.updateTodo(this.todo);
    this.router.navigate(['']);
  }

}
