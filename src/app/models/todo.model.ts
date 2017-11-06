export class TodoModel
{
  title: string;
  edit: boolean;
  active: boolean;
  complete: boolean;

  constructor(title: string, edit: boolean, active: boolean, complete: boolean) {
    this.title = title;
    this.edit = edit;
    this.active = active;
    this.complete = complete;
  }

  toggleEdit()
  {
    this.edit = !this.edit;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}
