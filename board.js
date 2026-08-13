/* ===========================================
   BOARD LAYER — Task Dashboard
=========================================== */

const COLUMNS = [
  { status: STATUS.IN_PROGRESS, dotClass: "column__dot--progress" },
  { status: STATUS.COMPLETED, dotClass: "column__dot--completed" },
  { status: STATUS.WONT_DO, dotClass: "column__dot--wontdo" },
];

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}


function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.status = task.status;
  card.dataset.id = task.id;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open task: ${task.name}`);

  card.innerHTML = `
    <div class="task-card__icon" aria-hidden="true">${task.icon || "📝"}</div>
    <div class="task-card__body">
      <h3 class="task-card__title">${escapeHtml(task.name)}</h3>
      ${
        task.description
          ? `<p class="task-card__desc">${escapeHtml(task.description)}</p>`
          : ""
      }
    </div>
  `;

  card.addEventListener("click", () => {
    document.dispatchEvent(
      new CustomEvent("task:open", { detail: { taskId: task.id } })
    );
  });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });

  return card;
}


function renderEmptyState(container) {
  const empty = document.createElement("p");
  empty.className = "column__empty";
  empty.textContent = "Nothing here yet.";
  container.appendChild(empty);
}


function renderBoard() {
  const tasks = getTasks(); // Person 1's function — single source of truth

  COLUMNS.forEach(({ status }) => {
    const column = document.querySelector(`.column[data-status="${status}"]`);
    if (!column) return;

    const cardsContainer = column.querySelector(".column__cards");
    const countBadge = column.querySelector(".column__count");

    cardsContainer.innerHTML = "";

    const columnTasks = tasks.filter((t) => t.status === status);
    countBadge.textContent = columnTasks.length;

    if (columnTasks.length === 0) {
      renderEmptyState(cardsContainer);
      return;
    }

    columnTasks.forEach((task) => {
      cardsContainer.appendChild(createTaskCard(task));
    });
  });
}

function initBoard() {
  renderBoard();

  const addBtn = document.getElementById("addTaskBtn");
  addBtn.addEventListener("click", () => {
     document.dispatchEvent(new CustomEvent("task:add"));
  });

  document.addEventListener("tasks:changed", renderBoard);
}

document.addEventListener("DOMContentLoaded", initBoard);
