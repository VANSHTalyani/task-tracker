const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    completed: false,
    priority: "high",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    completed: true,
    priority: "low",
    createdAt: "2024-01-14T15:30:00Z",
  },
];

export const loadTasks = () => {
  try {
    const data = localStorage.getItem('tasks');
    if (!data) return sampleTasks;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length ? parsed : sampleTasks;
  } catch {
    return sampleTasks;
  }
};


export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
