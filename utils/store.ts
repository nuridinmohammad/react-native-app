import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  loadTodos: () => void; // New action to load todos from AsyncStorage
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (text) =>
    set((state) => {
      const newTodo = { id: Date.now().toString(), text, done: false };
      const updatedTodos = [...state.todos, newTodo];
      AsyncStorage.setItem('todos', JSON.stringify(updatedTodos)).catch((error) => {
        console.error('Error storing todos in AsyncStorage', error);
      });
      return { todos: updatedTodos };
    }),

  toggleTodo: (id) =>
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      AsyncStorage.setItem('todos', JSON.stringify(updatedTodos)).catch((error) => {
        console.error('Error storing todos in AsyncStorage', error);
      });
      return { todos: updatedTodos };
    }),

  removeTodo: (id) =>
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      AsyncStorage.setItem('todos', JSON.stringify(updatedTodos)).catch((error) => {
        console.error('Error storing todos in AsyncStorage', error);
      });
      return { todos: updatedTodos };
    }),

  loadTodos: () => {
    AsyncStorage.getItem('todos')
      .then((todos) => {
        if (todos) {
          set({ todos: JSON.parse(todos) });
        }
      })
      .catch((error) => {
        console.error('Error loading todos from AsyncStorage', error);
      });
  },
}));

// Call loadTodos to load todos from AsyncStorage when your app starts
useTodoStore.getState().loadTodos();
