import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [priority, setPriority] = useState("medium"); // high, medium, low

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Keyboard shortcut: Enter to add task
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = {
        ...updated[editIndex],
        text: task.trim(),
        priority: priority,
      };
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTask("");
    setPriority("medium");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.text);
    setPriority(taskToEdit.priority);
    setEditIndex(index);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const clearAllTasks = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
    }
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.completed);
      case "completed":
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "";
    }
  };

  const activeTasksCount = tasks.filter((t) => !t.completed).length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-wrapper">
      <div className="todo-container">
        <div className="todo-card">
          <div className="todo-header">
            <h1 className="todo-title">
              <span className="title-icon">✨</span>
              <span className="title-text">To-Do List</span>
            </h1>
            <p className="todo-subtitle">Stay organized, stay productive</p>
          </div>

          <div className="input-section">
            <div className="input-group-wrapper">
              <input
                type="text"
                className="task-input"
                placeholder="What do you need to do?"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <select
                className="priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
              <button
                className={`add-button ${editIndex !== null ? "update" : "add"}`}
                onClick={addTask}
              >
                {editIndex !== null ? (
                  <>
                    <span>✓</span> Update
                  </>
                ) : (
                  <>
                    <span>+</span> Add
                  </>
                )}
              </button>
            </div>
            {editIndex !== null && (
              <button
                className="cancel-button"
                onClick={() => {
                  setEditIndex(null);
                  setTask("");
                  setPriority("medium");
                }}
              >
                Cancel
              </button>
            )}
          </div>

          {tasks.length > 0 && (
            <div className="stats-section">
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-label">Total</span>
                  <span className="stat-value">{tasks.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Active</span>
                  <span className="stat-value active">{activeTasksCount}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Completed</span>
                  <span className="stat-value completed">{completedTasksCount}</span>
                </div>
              </div>

              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${filter === "active" ? "active" : ""}`}
                  onClick={() => setFilter("active")}
                >
                  Active
                </button>
                <button
                  className={`filter-btn ${filter === "completed" ? "active" : ""}`}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </button>
              </div>
            </div>
          )}

          <div className="tasks-section">
            {getFilteredTasks().length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  {filter === "completed"
                    ? "🎉"
                    : filter === "active"
                    ? "📝"
                    : "✨"}
                </div>
                <p className="empty-text">
                  {filter === "completed"
                    ? "No completed tasks yet!"
                    : filter === "active"
                    ? "No active tasks! Great job!"
                    : "No tasks yet. Add one above to get started!"}
                </p>
              </div>
            ) : (
              <div className="tasks-list">
                {getFilteredTasks().map((item, index) => (
                  <div
                    key={item.id}
                    className={`task-item ${item.completed ? "completed" : ""} ${getPriorityClass(
                      item.priority
                    )}`}
                  >
                    <div className="task-content">
                      <button
                        className="checkbox"
                        onClick={() => toggleComplete(item.id)}
                      >
                        {item.completed ? (
                          <span className="check-icon">✓</span>
                        ) : (
                          <span className="check-box"></span>
                        )}
                      </button>
                      <div className="task-text-wrapper">
                        <span className="task-text">{item.text}</span>
                        <div className="task-meta">
                          <span className="priority-badge">
                            {getPriorityIcon(item.priority)} {item.priority}
                          </span>
                          <span className="task-date">
                            {new Date(item.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="task-actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => editTask(tasks.findIndex((t) => t.id === item.id))}
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => deleteTask(item.id)}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {tasks.length > 0 && (
            <button className="clear-all-button" onClick={clearAllTasks}>
              🧹 Clear All Tasks
            </button>
          )}
        </div>

        <footer className="app-footer">
          <p>
            Built with ❤️ by <span className="author-name">Vivek G L</span>
          </p>
          <p className="tech-stack">React • Bootstrap • LocalStorage</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
