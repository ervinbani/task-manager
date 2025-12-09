import { useState, useMemo } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import { Task, TaskStatus } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }>({});

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

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.status && task.status !== filters.status) {
        return false;
      }
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      return true;
    });
  }, [tasks, filters]);

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
        />
      </main>
    </div>
  );
}

export default App;
