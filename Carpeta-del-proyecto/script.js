let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

let data = JSON.parse(localStorage.getItem("data")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

const formValidation = () => {
  if (textInput.value === "") {
    msg.innerText = "La tarea no puede estar vacía";
  } else {
    msg.innerText = "";
    acceptData();
    resetForm();
  }
};

const acceptData = () => {
  let task = {
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
    completed: false,
  };

  data.push(task);
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

const createTasks = () => {
  tasks.innerHTML = "";

  data.forEach((task, index) => {
    const formattedDate = formatDate(task.date);

    tasks.innerHTML += `
      <div class="${task.completed ? "completed" : ""}" id="task-${index}">
        <span class="fw-bold">${task.text}</span>
        <span class="small text-secondary">${formattedDate}</span>
        <p>${task.description}</p>
        <span class="options">
          <button onclick="toggleComplete(${index})">✔</button>
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">🗑</button>
        </span>
      </div>
    `;
  });
};

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

const toggleComplete = (index) => {
  data[index].completed = !data[index].completed;
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

const deleteTask = (index) => {
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

const editTask = (index) => {
  const task = data[index];
  textInput.value = task.text;
  dateInput.value = task.date;
  textarea.value = task.description;

  deleteTask(index); // Elimina temporalmente para volver a guardar cuando se edite
};

const resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// Inicializar tareas guardadas
window.onload = () => {
  createTasks();
};