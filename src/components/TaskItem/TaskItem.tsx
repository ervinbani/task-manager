import type { TaskItemPropsExtended, TaskStatus } from "../../types";

const TaskItem: React.FC<TaskItemPropsExtended> = ({
  task,
  onStatusChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as TaskStatus);
  };

  const getPriorityClass = () => {
    switch (task.priority) {
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

  const getStatusClass = () => {
    switch (task.status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-in-progress";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== "completed";
  };

  return (
    <div className={`task-item ${getStatusClass()} ${getPriorityClass()}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge ${getPriorityClass()}`}>
          {task.priority}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <span className="task-due-date">
          Due: {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue() && <span className="overdue-badge"> ⚠️ Overdue</span>}
        </span>
      </div>

      <div className="task-actions">
        <div className="move-buttons">
          <button
            onClick={() => onMoveUp(task.id)}
            className="move-button"
            disabled={isFirst}
            aria-label="Move task up"
            title="Move up"
          >
            ⬆️
          </button>
          <button
            onClick={() => onMoveDown(task.id)}
            className="move-button"
            disabled={isLast}
            aria-label="Move task down"
            title="Move down"
          >
            ⬇️
          </button>
        </div>

        <select
          value={task.status}
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={() => onDelete(task.id)}
          className="delete-button"
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
