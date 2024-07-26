const taskInputEl = document.getElementById("taskInput")
const addButton = document.querySelector(".add")
const taskListEl = document.querySelector(".list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []
var count= 1;

if (tasks) {
    tasks.forEach(el => createTask(el.name, el.id))
}

function closeTask(e) {
    let newList = tasks.filter(el => {
        console.log(e.target.parentNode.id, el.id)
        return e.target.parentNode.id !== el.id
    })
    console.log("newList", newList)
    localStorage.setItem("tasks", JSON.stringify(newList))
    taskListEl.removeChild(e.target.parentNode)
    tasks = JSON.parse(localStorage.getItem("tasks"))
}

addButton.addEventListener("click", addTask)

function addTask() {
    if (!taskInputEl.value) return

     count = Number(count) + 1;
     let taskID=count
    localStorage.setItem("tasks", JSON.stringify([...tasks, { name: taskInputEl.value, id: taskID }]))
    createTask(taskInputEl.value, taskID)
    taskInputEl.value = ""
    tasks = JSON.parse(localStorage.getItem("tasks"))
}

function createTask(task, id) {
    let newTask = document.createElement("div")
    newTask.classList.add("task")
    let taskName = document.createElement("p")

     taskName.innerText = task
    let closeButton = document.createElement("button")
    closeButton.innerText = "⨉"
    closeButton.classList.add("close")
    closeButton.addEventListener("click", closeTask)
    newTask.setAttribute("id", id)
    newTask.appendChild(taskName)
    newTask.appendChild(closeButton)
    taskListEl.appendChild(newTask)
}
