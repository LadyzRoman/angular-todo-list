



import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {EditTodoComponent} from "../components/edit-todo/edit-todo.component";
import {Observable} from "rxjs/Observable";
import {TodoModel} from "../models/todo.model";

export class EditDeactivateGuard implements CanDeactivate<EditTodoComponent> {

  canDeactivate(component: EditTodoComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let todo = component.todo;
    let formTodo = Object.assign(new TodoModel(), component.editForm.value);
    let check: boolean = true;

    if (todo.title == formTodo.title
      && todo.subTodos.length == formTodo.subTodos.length) {
      for (let i = 0; i < todo.subTodos.length; i++)
        if (todo.subTodos[i].title != formTodo.subTodos[i].title)
          check = false;
    }
    else
      check = false;

    return check || confirm("Discard all changes?");
  }

}
