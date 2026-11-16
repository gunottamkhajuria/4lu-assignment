// app.ts
import { addTask, advanceTask, filterByStatus } from "./model.js";
import type { Task, TaskStatus } from "./model.js";
let tasks: Task[] = [];
let filter: "all" | TaskStatus = "all";

// Grab elements — cast so tsc knows exactly what they are.
const titleInput = document.getElementById("title") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const listEl = document.getElementById("list") as HTMLUListElement;
const chipsEl = document.getElementById("chips") as HTMLDivElement;
const statusSelect = document.getElementById("status") as HTMLSelectElement;

addBtn.onclick = () => {
  const title = titleInput.value.trim();   // .value is known & typed
  if (!title) return;
  const status = statusSelect.value as TaskStatus;  // use the dropdown
  tasks = addTask(tasks, title, status);           // returns a fresh Task[]
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
    li.className = `task ${task.status}`;
    const label = document.createElement("span");
    label.textContent = task.title;
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = task.status;
    const nextBtn = document.createElement("button");
    nextBtn.className = "advance";
    nextBtn.textContent = "→";
    nextBtn.title = "Advance status";
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      tasks = advanceTask(tasks, task.id);
      render();
    };
    li.append(label, badge, nextBtn);
    listEl.appendChild(li);
  }
}