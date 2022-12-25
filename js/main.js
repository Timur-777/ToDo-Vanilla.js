const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const isEmpty = document.querySelector("#emptyList");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTasks);

let tasks = [];
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach((task) => {
  const doneClass = task.done ? "task-title task-title--done" : "task-title";
  const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
  <span class="${doneClass}">${task.text}</span>
  <div class="task-item__buttons">
      <div class="date-style">${task.date}</div>
      <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
      </button>
      <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
      </button>
  </div>
</li>`;
  tasksList.insertAdjacentHTML("beforeend", taskHtml);
});

checkList();

function addTask(e) {
  e.preventDefault();
  const inputValue = taskInput.value;

  const newTask = {
    id: Date.now(),
    done: false,
    text: inputValue,
    date: new Date().toLocaleDateString(),
  };

  tasks.push(newTask);

  const doneClass = newTask.done ? "task-title task-title--done" : "task-title";

  const task = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${doneClass}">${newTask.text}</span>
        <div class="task-item__buttons">
            <div class="date-style">${newTask.date}</div>
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
      </li>`;
  tasksList.insertAdjacentHTML("beforeend", task);
  taskInput.value = "";
  taskInput.focus();
  checkList();
  setObjToLS();
}

function deleteTask(e) {
  if (e.target.dataset.action !== "delete") return;
  const delTask = e.target.closest(".task-item");

  tasks = tasks.filter((task) => task.id != delTask.id);

  delTask.remove();
  checkList();
  setObjToLS();
}

function doneTasks(e) {
  if (e.target.dataset.action !== "done") return;
  const doneTask = e.target.closest(".task-item");
  const doneStatus = tasks.find((task) => task.id == doneTask.id);
  doneStatus.done = !doneStatus.done;
  const doneTaskText = doneTask.querySelector(".task-title");
  doneTaskText.classList.toggle("task-title--done");
  setObjToLS();
}

function checkList() {
  if (tasks.length === 0) {
    const emptyHTML = ` <li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
    <div class="empty-list__title">List of tasks is empty</div></li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyHTML);
  }
  if (tasks.length > 0) {
    const emptyEl = document.querySelector("#emptyList");
    emptyEl ? emptyEl.remove() : null;
  }
}

function setObjToLS() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
