import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TodoModel} from "../../models/todo.model";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  editForm: FormGroup;
  @Input() todo: TodoModel;
  @Output() todoChange = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl(this.todo.title)
    });
  }

  handleEdit(value : any)
  {
    this.todo.title = value.title;
    this.todoService.updateTodo(this.todo);
    this.todoChange.emit();
  }

}
