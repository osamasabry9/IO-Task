# Todo App

A simple, feature-rich **Todo Application** built with **React, TypeScript, and Vite**.  
It showcases **CRUD operations**, **sorting**, **pagination**, and leverages **React Context** for state management.

---

## 🚀 Deployed Application
**URL:** [http://iotask-eight.vercel.app/](http://iotask-eight.vercel.app/)


---

## 🏗 Project Structure

```
📦 src
├── 📂 api               # API service configurations and handlers
├── 📂 components        # Reusable UI components
│   ├── EmptyState.tsx  # Component for empty list state
│   ├── Header.tsx      # Main application header
│   ├── LoadingSpinner.tsx # Loading indicator component
│   ├── Pagination.tsx  # Pagination controls
│   ├── SortButton.tsx  # Sorting control component
│   ├── TodoForm.tsx    # Todo creation/editing form
│   ├── TodoItem.tsx    # Individual todo item component
│   └── TodoList.tsx    # Todo list container
├── 📂 contexts         # React context providers
│   └── TodoContext.tsx # Global state management
├── 📂 hooks            # Custom React hooks
│   ├── useEditTodo.ts  # Todo editing logic
│   ├── usePaginatedTodos.ts # Pagination logic
│   ├── useSort.ts      # Sorting functionality
│   └── useTodos.ts     # Main todos logic
├── 📂 types            # TypeScript type definitions
│   ├── index.ts        # Barrel exports
│   ├── todo.type.ts    # Todo entity typing
│   └── todoAction.type.ts # Reducer action types
├── 📜 App.tsx          # Root application component
├── 📜 main.tsx         # Application entry point
├── 📜 index.css        # Main stylesheet
└── 📜 vite-env.d.ts    # Vite type declarations
---

---

## ⚙️ Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/osamasabry9/IO-Task.git
   cd todo-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   > This will install all required packages listed in `package.json`.

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   - By default, Vite will start the app at [http://localhost:5173](http://localhost:5173).

---

## 🛠 Build for Production

To create an optimized production build, run:

```bash
npm run build
```

Then you can preview the build locally with:

```bash
npm run preview
```

---

## ✅ Features

- **Add, Edit, and Delete** Todos
- **Sorting** (ascending or descending by title)
- **Pagination** for efficient navigation
- **Global State** management via React Context
- **Custom Hooks** (e.g., `useTodos`, `useSort`, `usePaginatedTodos`)
- **Animations** with Framer Motion
- **Notifications** with react-hot-toast

---

## 🤝 Contributing

1. **Fork** the repository.
2. **Create** a new branch for your feature or bugfix.
3. **Commit** your changes.
4. **Open** a Pull Request.

---

## 📜 License

This project is open source under the [MIT License](LICENSE).  
Feel free to use and modify the code as you see fit.

---

### 🙌 Thank You!

Thank you for checking out this Todo App. If you have any questions or suggestions, feel free to open an issue or submit a pull request. Enjoy building! 
```
