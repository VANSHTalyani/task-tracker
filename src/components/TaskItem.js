import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
    const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [priority, setPriority] = useState(task.priority || 'medium');
  const [due, setDue] = useState(task.dueDate || '');
  const [tags, setTags] = useState((task.tags || []).join(', '));

  const save = () => {
    onEdit(task.id, title.trim() || task.title, desc.trim(), priority, due, tags.split(',').map(t=>t.trim()).filter(Boolean));
    setEditing(false);
  };

  return (
    <li className={`task-item fade ${task.completed ? 'completed-item' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
      </label>
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={desc} onChange={(e) => setDesc(e.target.value)} />
          <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="date" value={due} onChange={(e)=>setDue(e.target.value)} />
          <input value={tags} placeholder="tags" onChange={(e)=>setTags(e.target.value)} />
          <button onClick={save}>Save</button>
        </>
      ) : (
        <div className="details" onDoubleClick={() => setEditing(true)}>
          <span className="title">{task.title}</span>
          {task.description && <p className="desc">{task.description}</p>}
          <span className={`badge priority-${task.priority}`}>{task.priority}</span>
          {task.dueDate && <span className="badge due">Due: {task.dueDate}</span>}
          {(task.tags||[]).length>0 && task.tags.map(tag=>(<span key={tag} className="badge tag">{tag}</span>))}
          <small className="date">{new Date(task.createdAt).toLocaleString()}</small>
        </div>
      )}
      <button onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
      <button onClick={() => window.confirm('Delete task?') && onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
