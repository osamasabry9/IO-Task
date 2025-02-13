import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { TodoProvider } from './contexts/TodoContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </TodoProvider>
  </StrictMode>
);
