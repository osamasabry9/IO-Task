export interface Todo {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreateTodoInput {
  title: string;
  body: string;
  userId: number;
}