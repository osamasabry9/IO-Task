 interface Todo {
  id: number;
  title: string;
  body: string;
  userId: number;
}

 interface CreateTodoInput {
  title: string;
  body: string;
  userId: number;
}

 export { type Todo, type CreateTodoInput}
