# Task Manager

A modern, feature-rich task management application built with React, TypeScript, and Vite. This project demonstrates component composition, state management, TypeScript integration, and advanced React patterns.

## 🚀 Features

### Core Functionality

- ✅ **Task Management**: Create, read, update, and delete tasks
- 🔄 **Status Tracking**: Track task status (Pending, In Progress, Completed)
- 🎯 **Priority Levels**: Organize tasks by priority (Low, Medium, High)
- 📅 **Due Dates**: Set and track task deadlines with overdue indicators
- 🔍 **Advanced Filtering**: Filter tasks by status and priority
- 📊 **Sort by Date**: Sort tasks by due date in ascending order
- ⬆️⬇️ **Task Reordering**: Move tasks up and down in the list
- 💾 **LocalStorage Persistence**: Tasks automatically saved and restored across sessions

### User Experience

- 🎨 **Visual Feedback**: Color-coded status and priority indicators
- ⚠️ **Overdue Alerts**: Animated warning badges for overdue tasks
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✨ **Smooth Animations**: Fade-in, slide-up, and hover effects
- 🎯 **Form Validation**: Required field validation for task creation
- 🖱️ **Intuitive UI**: Hover states and visual feedback on all interactive elements

### Technical Highlights

- 💪 **TypeScript**: Fully typed components and interfaces
- 🏗️ **Component Architecture**: Clean separation of concerns
- ⚡ **Performance Optimized**: Uses `useMemo` for efficient filtering
- 🎭 **Modal Forms**: Overlay form for task creation
- 🔒 **Type Safety**: Strict TypeScript configuration
- 💾 **Data Persistence**: Browser localStorage for automatic saving

## 📁 Project Structure

```
src/
├── components/
│   ├── TaskList/
│   │   └── TaskList.tsx       # List container with sorting and add buttons
│   ├── TaskItem/
│   │   └── TaskItem.tsx       # Individual task card with actions
│   ├── TaskFilter/
│   │   └── TaskFilter.tsx     # Filter controls for status and priority
│   └── TaskForm/
│       └── TaskForm.tsx       # Modal form for creating new tasks
├── types/
│   └── index.ts               # TypeScript interfaces and types
├── App.tsx                    # Main application component
├── App.css                    # Application styles
└── main.tsx                   # Application entry point
```

## 🛠️ Technologies Used

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **CSS3** - Styling with modern features (Grid, Flexbox, Animations)

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/ervinbani/task-manager.git
cd task-manager
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 Usage

### Creating a Task

1. Click the **"➕ Add New Task"** button
2. Fill in the task details:
   - Title (required)
   - Description (required)
   - Status (default: Pending)
   - Priority (default: Medium)
   - Due Date (required, must be today or later)
3. Click **"Add Task"** to create or **"Cancel"** to close

### Managing Tasks

- **Change Status**: Use the dropdown in each task card
- **Delete Task**: Click the **"Delete"** button
- **Reorder Tasks**: Use the ⬆️ and ⬇️ buttons to move tasks
- **Filter Tasks**: Use the filter dropdowns to show specific tasks
- **Sort Tasks**: Click **"📅 Sort by Date"** to sort by due date

### Visual Indicators

- **Status Colors**:
  - 🟠 Orange border = Pending
  - 🔵 Blue border = In Progress
  - 🟢 Green border = Completed (with strikethrough)
- **Priority Badges**:
  - 🔴 Red = High Priority
  - 🟠 Orange = Medium Priority
  - ⚫ Gray = Low Priority
- **Overdue Warning**: ⚠️ Pulsing badge for overdue tasks

## 🏗️ Component Architecture

### Data Flow

```
App (State Management)
 ├─ TaskFilter (Filter Controls)
 │   └─ Emits: onFilterChange(filters)
 │
 └─ TaskList (List Container)
     ├─ Emits: onAddTask(), onSortByDate()
     └─ TaskItem[] (Individual Cards)
         ├─ Emits: onStatusChange(taskId, status)
         ├─ Emits: onDelete(taskId)
         └─ Emits: onMoveUp(taskId), onMoveDown(taskId)

TaskForm (Modal Overlay)
 └─ Emits: onAddTask(task), onCancel()
```

### Key Patterns

- **Prop Drilling**: Event handlers passed through component hierarchy
- **Controlled Components**: Form inputs managed by React state
- **Conditional Rendering**: Empty states, disabled buttons, overdue badges
- **List Rendering**: Efficient rendering with unique keys
- **Immutable Updates**: State updates using `.map()`, `.filter()`, spread operator

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling Features

- **Gradient Headers**: Modern gradient backgrounds
- **Card-based Layout**: Elevated cards with shadows
- **Hover Effects**: Transform and shadow animations
- **Responsive Grid**: Auto-fitting grid layout
- **Modal Overlays**: Smooth fade-in and slide-up animations
- **Disabled States**: Visual feedback for disabled buttons
- **Focus States**: Accessibility-friendly focus indicators

## 🔧 Configuration

The project uses:

- **TypeScript**: Strict mode enabled with `verbatimModuleSyntax`
- **ESLint**: React hooks and TypeScript rules
- **Vite**: Fast HMR and optimized builds
- **SWC**: Fast TypeScript compilation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Ervin Bani**

- GitHub: [@ervinbani](https://github.com/ervinbani)

## 🙏 Acknowledgments

- Built as part of Per Scholas React curriculum
- Design inspired by modern task management applications
- Icons: Unicode emojis for lightweight performance

## 💭 Reflection Questions

### How did you ensure unique keys for your list items?

Each task has a unique `id` property (string type) generated using `Date.now().toString()` for new tasks. This ID is used as the `key` prop in the `.map()` function when rendering the TaskItem components.

### What considerations did you make when implementing the filtering functionality?

- Used `useMemo` to avoid unnecessary recalculations on every render
- Implemented multi-criteria filtering (status AND priority)
- Maintained original task order while filtering
- Ensured filtered results update reactively when tasks or filters change
- Added dependency array `[tasks, filters, sortByDate]` to optimize performance

### How did you handle state updates for task status changes?

Used immutable state updates with `.map()` to create a new array, updating only the specific task that matches the `taskId`. The pattern: `tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task)` ensures React detects the change and re-renders efficiently.

### What challenges did you face when implementing conditional rendering?

- **Empty states**: Showed different UI when task list is empty vs populated
- **Disabled buttons**: Move up/down buttons needed to check if task is first/last in list
- **Overdue badges**: Required date comparison logic and status checking
- **Filter reset button**: Only displayed when filters are actively applied
- **Completed task styling**: Applied conditional CSS classes and strikethrough based on status

---
