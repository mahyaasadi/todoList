import { v4 as uuidV4 } from "uuid";

let inputEle = document.querySelector<HTMLInputElement>(".input");
let submitEle = document.querySelector<HTMLElement>(".add");
let tasksDiv = document.querySelector<HTMLElement>(".tasks");
let containerDiv = document.querySelector<HTMLElement>(".container");
let deleteAll = document.querySelector<HTMLElement>(".delete-all");
let arrayOfTasks: Task[] = [];

type Task = { id: string; title: string; completed: boolean };

let givenTasks = window.localStorage.getItem("tasks");
if (givenTasks) {
  arrayOfTasks = JSON.parse(givenTasks);
}
getTaskFromLocalStorage();

function getTaskFromLocalStorage() {
  if (givenTasks) {
    let tasks = JSON.parse(givenTasks);
    // console.log(tasks)
    addTaskToPage(tasks);
  }
}

function addTaskToPage(arrayOfTasks: Task[]) {
  if (tasksDiv) {
    tasksDiv.innerHTML = "";
  }

  arrayOfTasks.forEach((task: Task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv?.appendChild(div);
    // console.log(div)
  });
}

if (submitEle) {
  submitEle.onclick = function () {
    if (inputEle?.value !== "" && inputEle !== null) {
      addTaskToArray(inputEle?.value);
      inputEle.value = "";
    }
  };
}

function addTaskToArray(taskText: string) {
  const task = {
    id: uuidV4(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  console.log(arrayOfTasks);
  addTaskToPage(arrayOfTasks);
  addTaskToLocalStorage(arrayOfTasks);
}

function addTaskToLocalStorage(arrayOfTasks: Task[]) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// Delete One Task
if (tasksDiv) {
  tasksDiv.onclick = (e) => {
    // let e.target: HTMLElement;
    if ((e.target as HTMLElement)?.classList.contains("del")) {
      // e.target.parentElement.remove();
      (e.target as MouseElement)?.parentElement.remove();
      deleteTaskFromLocalStorage(
        (e.target as Element)?.parentElement.getAttribute("data-id")
      );
    }
    if ((e.target as Element).classList.contains("task")) {
      (e.target as Element).classList.toggle("done");
      updateStatusInLocalStorage(e.target.getAttribute("data-id"));
    }
  };
}

function deleteTaskFromLocalStorage(taskId: string) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTaskToLocalStorage(arrayOfTasks);
}

function updateStatusInLocalStorage(taskId: string) {
  arrayOfTasks.forEach((task) => {
    if (task.id == taskId)
      task.completed == false
        ? (task.completed = true)
        : (task.completed = false);
  });
  addTaskToLocalStorage(arrayOfTasks);
}

if (deleteAll) {
  deleteAll.onclick = function (e) {
    if (tasksDiv) tasksDiv.innerHTML = "";
    window.localStorage.removeItem("tasks");
  };
}
