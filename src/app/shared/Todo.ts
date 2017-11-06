export class Todo
{
  title: string;
  edit: boolean;


  constructor(title: string, edit: boolean) {
    this.title = title;
    this.edit = edit;
  }

  toggleEdit()
  {
    this.edit = !this.edit;
  }
}
