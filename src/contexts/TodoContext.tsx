import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import { Todo } from "../types/todo.type";
import { TodoAction, TodoActionType } from "../types";

// Type definitions for more explicit intent
interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

// Configuration constants for maintainability
const DEFAULT_ITEMS_PER_PAGE = 5;
const INITIAL_PAGE = 1;

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: null,
  currentPage: INITIAL_PAGE,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
};

// Helper type for context value to avoid repetition
type TodoContextValue = {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
};

/**
 * Reducer function that handles todo state operations
 * @param state Current state
 * @param action Action to perform
 * @returns New state
 */
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionType.SET_TODOS:
      return { ...state, todos: action.payload };

    case TodoActionType.ADD_TODO:
      // Add new todo to the beginning of the list
      return { ...state, todos: [action.payload, ...state.todos] };

    case TodoActionType.UPDATE_TODO:
      // Update existing todo while preserving order
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };

    case TodoActionType.DELETE_TODO:
      // Filter out deleted todo
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TodoActionType.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case TodoActionType.SET_ERROR:
      return { ...state, error: action.payload };

    case TodoActionType.SET_PAGE:
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
};

// Create context with safe default value
const TodoContext = createContext<TodoContextValue>({
  state: initialState,
  dispatch: () => null,
});

/**
 * Provider component that wraps the app with todo context
 * @param children Child components to be wrapped
 */
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

/**
 * Custom hook for accessing todo context
 * @throws Error if used outside TodoProvider
 * @returns Todo context value
 */
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
