const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const remainingTasks = document.getElementById("remainingTasks");

const themeBtn = document.getElementById("themeBtn");

const date = document.getElementById("date");

date.innerHTML = new Date().toLocaleDateString("ar-SA",{
  weekday:"long",
  year:"numeric",
  month:"long",
  day:"numeric"
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}

function updateStats(){

  totalTasks.innerHTML = tasks.length;

  const completed =
  tasks.filter(task => task.completed).length;

  completedTasks.innerHTML = completed;

  remainingTasks.innerHTML =
  tasks.length - completed;

}

function renderTasks(){

  taskList.innerHTML = "";

  tasks.forEach((task,index)=>{

    const li = document.createElement("li");

    li.classList.add("task");

    if(task.completed){

      li.classList.add("completed");

    }

    li.innerHTML = `
      <span>${task.text}</span>

      <div class="actions">

        <button class="complete">
          ✔
        </button>

        <button class="delete">
          ✖
        </button>

      </div>
    `;

    li.querySelector(".complete")
    .addEventListener("click",()=>{

      tasks[index].completed =
      !tasks[index].completed;

      saveTasks();

      renderTasks();

    });

    li.querySelector(".delete")
    .addEventListener("click",()=>{

      tasks.splice(index,1);

      saveTasks();

      renderTasks();

    });

    taskList.appendChild(li);

  });

  updateStats();

}

addTaskBtn.addEventListener("click",()=>{

  const text =
  taskInput.value.trim();

  if(text === "") return;

  tasks.push({
    text:text,
    completed:false
  });

  saveTasks();

  renderTasks();

  taskInput.value = "";

});

themeBtn.addEventListener("click",()=>{

  document.body.classList.toggle("light");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light")
  );

});

if(localStorage.getItem("theme") === "true"){

  document.body.classList.add("light");

}

renderTasks();