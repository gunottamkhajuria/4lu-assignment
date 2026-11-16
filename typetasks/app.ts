// app.ts
import { addTask, completeTask, filterByStatus } from "./model.js";
import type { Task, TaskStatus } from "./model.js";
let tasks: Task[] = [];
let filter: "all" | TaskStatus = "all";

// Grab elements — cast so tsc knows exactly what they are.
const titleInput = document.getElementById("title") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const listEl = document.getElementById("list") as HTMLUListElement;
const chipsEl = document.getElementById("chips") as HTMLDivElement;

addBtn.onclick = () => {
  const title = titleInput.value.trim();   // .value is known & typed
  if (!title) return;
  tasks = addTask(tasks, title);           // returns a fresh Task[]
  titleInput.value = "";
  render();
};

function render(): void {
  // Filter chips
  const statuses: ("all" | TaskStatus)[] = ["all", "todo", "in-progress", "done"];
  chipsEl.innerHTML = "";
  for (const s of statuses) {
    const chip = document.createElement("button");
    chip.textContent = s;
    if (filter === s) chip.classList.add("active");
    chip.onclick = () => {
      filter = s;
      render();
    };
    chipsEl.appendChild(chip);
  }

  // Task list
  const visible = filter === "all" ? tasks : filterByStatus(tasks, filter);
  listEl.innerHTML = "";
  for (const task of visible) {
    const li = document.createElement("li");
    li.textContent = `${task.title} — ${task.status}`;
    if (task.status === "done") li.classList.add("done");
    li.onclick = () => {
      tasks = completeTask(tasks, task.id);
      render();
    };
    listEl.appendChild(li);
  }
}