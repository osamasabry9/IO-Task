import axios from 'axios';
import { CreateTodoInput, Todo } from '../types/todo';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  },

  createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
    const response = await axios.post(`${API_BASE_URL}/posts`, todo);
    return response.data;
  },

  updateTodo: async (id: number, todo: Partial<Todo>): Promise<Todo> => {
    const response = await axios.patch(`${API_BASE_URL}/posts/${id}`, todo);
    return response.data;
  },

  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/posts/${id}`);
  },
};