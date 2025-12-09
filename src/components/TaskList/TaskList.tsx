import type { TaskListPropsExtended } from "../../types";
import TaskItem from "../TaskItem/TaskItem";

const TaskList: React.FC<TaskListPropsExtended> = ({
  tasks,
  onStatusChange,
  onDelete,
  onAddTask,
  onSortByDate,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks ({tasks.length})</h2>
        <div className="task-list-actions">
          <button onClick={onSortByDate} className="sort-button">
            📅 Sort by Date
          </button>
          <button onClick={onAddTask} className="add-task-button">
            ➕ Add New Task
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="task-list-empty">
          <p>No tasks to display. Add a new task to get started!</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              isFirst={index === 0}
              isLast={index === tasks.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
