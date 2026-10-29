# Kanban Task Board

A responsive Kanban board to manage tasks across Todo, In Progress, Completed and Backlog columns. Built with React, Vite and Tailwind CSS. Tasks are saved in the browser, so they stay after a refresh.

- **Live demo:** https://your-app.vercel.app
- **Demo video:** https://your-video-link

![Desktop view](./screenshots/desktop.png)

## Features

- Add a task with title, description, priority and due date
- Edit and delete tasks (delete asks for confirmation)
- Move tasks between columns using drag and drop or the status dropdown on each card
- Search tasks by title (case-insensitive, partial match)
- Filter by priority and status, combined with search
- Tasks are saved in LocalStorage and restored on refresh
- Form validation with error messages next to each field
- Empty board, empty column and no-results states
- Overdue label on tasks that are past their due date and not completed
- Toast messages after add, update and delete
- Responsive layout: 4 columns on large screens, 2 on tablets, 1 on mobile

## Tech Stack

- React (Vite)
- Tailwind CSS v4
- React Router
- lucide-react for icons
- Native HTML5 drag and drop

## Getting Started

```bash
git clone https://github.com/your-username/kanban-board.git
cd kanban-board
npm install
npm run dev
```

To create a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├─ main.jsx
├─ index.css
├─ routes/AppRoutes.jsx
├─ layouts/MainLayout.jsx
├─ pages/
│  ├─ Board.jsx
│  └─ NotFound.jsx
├─ components/
│  ├─ DashboardHeader.jsx
│  ├─ Toolbar.jsx
│  ├─ Column.jsx
│  ├─ TaskCard.jsx
│  ├─ TaskModal.jsx
│  ├─ DeleteModal.jsx
│  ├─ Modal.jsx
│  ├─ Select.jsx
│  ├─ Toast.jsx
│  └─ EmptyState.jsx
├─ hooks/useTasks.js
└─ utils/constants.js
```

## How It Works

**State management.** All task data lives in one custom hook, `useTasks`. It exposes `tasks` along with `addTask`, `updateTask`, `deleteTask` and `moveTask`. The state is only used on one page, so I did not add Redux.

**Persistence.** `useTasks` reads from LocalStorage (key: `kanban-tasks`) once, on the first render. After that, a `useEffect` writes the tasks back whenever they change. If the stored data is missing or corrupted, the app starts with an empty list instead of crashing.

**Search and filters.** The original `tasks` array is never changed by search or filters. `Board` creates `visibleTasks` from it on every render, and the columns are built from that list. Clearing a filter brings everything back, and there is no second copy of the data to keep in sync.

**Add and edit.** Both use the same `TaskModal`. When a task is passed in, the form opens pre-filled. Otherwise it opens empty.

**Drag and drop.** The card sets the task id on drag start, and each column reads that id on drop and calls `moveTask`.

**Dates.** Due dates are stored as `YYYY-MM-DD` strings, which makes the overdue check a simple string comparison without timezone issues.

## Validation Rules

- Title is required and must have at least 3 characters (spaces at the ends are trimmed)
- Due date is required
- Description is optional
- An error disappears as soon as the user edits that field

## Known Limitations

- Native HTML5 drag and drop does not work on touch screens. On mobile, use the status dropdown on the card.
- Tasks are stored per browser. There is no login or backend.
- The modal does not trap keyboard focus. It focuses the first field on open and closes with Escape.
- The theme toggle and profile menu shown in the design are not built. The header avatar is static.

## Possible Improvements

- Dark mode
- Reorder tasks inside a column
- Touch support for drag and drop
- Backend with user accounts

## Author

Mohd Rizwan  
