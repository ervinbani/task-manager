import { useState, useMemo, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import TaskForm from "./components/TaskForm/TaskForm";
import type { Task, TaskStatus } from "./types";

const STORAGE_KEY = "task-manager-tasks";

const getInitialTasks = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse stored tasks:", error);
    }
  }
  // Default tasks if nothing in localStorage
  return [
    {
      id: "1",
      title: "Complete project proposal",
      description: "Write and submit the Q1 project proposal",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-12-15",
    },
    {
      id: "2",
      title: "Review code changes",
      description: "Review pull requests from team members",
      status: "pending",
      priority: "medium",
      dueDate: "2025-12-10",
    },
    {
      id: "3",
      title: "Update documentation",
      description: "Update API documentation with new endpoints",
      status: "completed",
      priority: "low",
      dueDate: "2025-12-05",
    },
  ];
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);

  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }>({});

  const [showForm, setShowForm] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleFilterChange = (newFilters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => {
    setFilters(newFilters);
  };

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
  };

  const handleMoveUp = (taskId: string) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index > 0) {
      const newTasks = [...tasks];
      [newTasks[index - 1], newTasks[index]] = [
        newTasks[index],
        newTasks[index - 1],
      ];
      setTasks(newTasks);
    }
  };

  const handleMoveDown = (taskId: string) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index < tasks.length - 1) {
      const newTasks = [...tasks];
      [newTasks[index], newTasks[index + 1]] = [
        newTasks[index + 1],
        newTasks[index],
      ];
      setTasks(newTasks);
    }
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      if (filters.status && task.status !== filters.status) {
        return false;
      }
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      return true;
    });

    if (sortByDate) {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    }

    return filtered;
  }, [tasks, filters, sortByDate]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        <TaskFilter onFilterChange={handleFilterChange} />
        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onAddTask={() => setShowForm(true)}
          onSortByDate={handleSortByDate}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
        />
      </main>

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
