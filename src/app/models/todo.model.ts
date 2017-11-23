export interface ITodo
{
  id: number;
  title?: string;
  complete?: boolean;
}



export class TodoModel
{
  id: number;
  title: string;
  complete: boolean;

  constructor(model?: ITodo) {
    if (model)
    {
      this.id = model.id;
      this.title = model.title || 'new Todo';
      this.complete = model.complete || false;
    }
    else
    {
      this.id = 1;
      this.title = 'undefined';
      this.complete = false;
    }
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}
