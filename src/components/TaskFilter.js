import React from 'react';

const TaskFilter = ({ filter, onChange, tasks = [] }) => {
  const all = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;
  return (
    <div className="task-filter">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => onChange('all')}
      >
        All ({all})
      </button>
      <button
        className={filter === 'active' ? 'active' : ''}
        onClick={() => onChange('active')}
      >
        Active ({active})
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => onChange('completed')}
      >
        Completed ({completed})
      </button>
    </div>
  );
};

export default TaskFilter;
