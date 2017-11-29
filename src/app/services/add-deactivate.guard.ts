



import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {TodoModel} from "../models/todo.model";
import {AddTodoComponent} from "../components/add-todo/add-todo.component";

export class AddDeactivateGuard implements CanDeactivate<AddTodoComponent> {

  canDeactivate(component: AddTodoComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let todo = Object.assign(new TodoModel(), component.addForm.value);

    if(todo.title.length == 0 && todo.subTodos.length == 0)
      return true;

    return confirm("Discard all changes?");
  }

}
