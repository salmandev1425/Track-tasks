const tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

const total = tasks.length;

const completed =
tasks.filter(task => task.completed).length;

const remaining = total - completed;

const progress =
total === 0
? 0
: Math.floor((completed / total) * 100);

document.getElementById("all")
.innerHTML = total;

document.getElementById("done")
.innerHTML = completed;

document.getElementById("remaining")
.innerHTML = remaining;

document.getElementById("progress")
.innerHTML = progress + "%";