import { useState } from "react";
import type { TaskFilterProps, TaskStatus } from "../../types";

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | "all">(
    "all"
  );
  const [selectedPriority, setSelectedPriority] = useState<
    "low" | "medium" | "high" | "all"
  >("all");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus | "all";
    setSelectedStatus(status);

    onFilterChange({
      status: status === "all" ? undefined : status,
      priority: selectedPriority === "all" ? undefined : selectedPriority,
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value as "low" | "medium" | "high" | "all";
    setSelectedPriority(priority);

    onFilterChange({
      status: selectedStatus === "all" ? undefined : selectedStatus,
      priority: priority === "all" ? undefined : priority,
    });
  };

  const handleReset = () => {
    setSelectedStatus("all");
    setSelectedPriority("all");
    onFilterChange({});
  };

  const hasActiveFilters =
    selectedStatus !== "all" || selectedPriority !== "all";

  const getStatusClass = () => {
    switch (selectedStatus) {
      case "pending":
        return "filter-status-pending";
      case "in-progress":
        return "filter-status-in-progress";
      case "completed":
        return "filter-status-completed";
      default:
        return "";
    }
  };

  const getPriorityClass = () => {
    switch (selectedPriority) {
      case "high":
        return "filter-priority-high";
      case "medium":
        return "filter-priority-medium";
      case "low":
        return "filter-priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="task-filter">
      <h3>Filter Tasks</h3>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={handleStatusChange}
            className={`filter-select ${getStatusClass()}`}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter">Priority:</label>
          <select
            id="priority-filter"
            value={selectedPriority}
            onChange={handlePriorityChange}
            className={`filter-select ${getPriorityClass()}`}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="reset-button"
            aria-label="Reset filters"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskFilter;
