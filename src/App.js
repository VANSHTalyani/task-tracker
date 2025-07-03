import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import TaskFilter from './components/TaskFilter';
import { loadTasks, saveTasks } from './utils/localStorage';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState(loadTasks());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true');

  useEffect(() => {
    saveTasks(tasks);
    localStorage.setItem('dark', dark);
    document.body.classList.toggle('dark', dark);
  }, [tasks, dark]);

  const addTask = ({ title, description, priority = 'medium', dueDate = '', tags = [] }) => {
    setTasks([
      ...tasks,
      { id: Date.now(), title, description, priority, dueDate, tags, completed: false, createdAt: new Date().toISOString() }
    ]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const editTask = (id, title, description, priority = 'medium', dueDate = '', tags = []) => {
    setTasks(tasks.map((t) => (
      t.id === id ? { ...t, title, description, priority, dueDate, tags } : t
    )));
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const searchLower = search.toLowerCase();
  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed;

    const matchesSearch = !searchLower ||
      t.title.toLowerCase().includes(searchLower) ||
      t.description.toLowerCase().includes(searchLower) ||
      (t.tags || []).some((tag) => tag.toLowerCase().includes(searchLower));
    return matchesStatus && matchesSearch;
  });

  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const location = useLocation();
  useEffect(()=>{
    const handleStorage=()=>setUsername(localStorage.getItem('username')||'');
    window.addEventListener('storage',handleStorage);
    return ()=>window.removeEventListener('storage',handleStorage);
  },[]);

  // Refresh username whenever the current route changes (e.g. after Login → /)
  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, [location]);

  const dashboard = (
    <div className="app-container">
      <header>
        <h1>Task Tracker</h1>
        <div className="header-right">
          <label htmlFor="search" className="visually-hidden">Search tasks</label>
          <input
            id="search"
            className="search"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
              className={`mode-toggle ${dark ? 'dark' : 'light'}`}
              role="button"
              aria-label="Toggle dark mode"
              onClick={() => setDark(!dark)}
            >
              <div className="indicator" />
            
            

            
            
            <span className={dark ? 'active' : ''}>Dark</span>
              <span className={!dark ? 'active' : ''}>Light</span>
            </div>
          <span className="user">Hi, {username}</span>
          <button onClick={()=>{localStorage.removeItem('username'); window.location.reload();}}>Logout</button>
        </div>
      </header>
      <TaskForm onAdd={addTask} />
      <TaskFilter filter={filter} onChange={setFilter} tasks={tasks} />

      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={username ? dashboard : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
