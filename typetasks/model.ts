// A status can only ever be one of these three exact strings.
export type TaskStatus = "todo" | "in-progress" | "done";

// Every Task must have this exact shape.
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}
let nextId = 1;

// Add a new task with a chosen starting status.
export function addTask(tasks: Task[], title: string, status: TaskStatus = "todo"): Task[] {
  const newTask: Task = { id: nextId++, title, status };
  return [...tasks, newTask];
}

// Advance a task to the next status: todo → in-progress → done.
export const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  "todo": "in-progress",
  "in-progress": "done",
  "done": "todo",
};

// Set a task's status by id.
export function setStatus(tasks: Task[], id: number, status: TaskStatus): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status } : t));
}

// Advance a task by one step (cycles back to todo after done).
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: NEXT_STATUS[t.status] } : t));
}

// Return only the tasks matching a given status.
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}