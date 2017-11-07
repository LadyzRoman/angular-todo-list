export class TodoModel
{
  id: number;
  title: string;
  complete: boolean;

  constructor(id: number, title: string, complete: boolean) {
    this.id = id;
    this.title = title;
    this.complete = complete;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}
