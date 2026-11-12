// Academic Planner: add, complete, delete tasks (array + DOM manipulation)
var tasks = [];
var currentFilter = "all";
var STORE_KEY = "david_planner_tasks";

var form = document.getElementById("taskForm");
var input = document.getElementById("taskInput");
var priority = document.getElementById("priority");
var dueDate = document.getElementById("dueDate");
var list = document.getElementById("taskList");
var errorBox = document.getElementById("taskError");

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(tasks)); } catch (e) {}
}
function load() {
  try { tasks = JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (e) { tasks = []; }
}

function addTask(text, prio, due) {
  tasks.push({ id: Date.now(), text: text, priority: prio, due: due, done: false });
  save(); render();
}
function toggleTask(id) {
  tasks.forEach(function (t) { if (t.id === id) t.done = !t.done; });
  save(); render();
}
function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  save(); render();
}

function render() {
  list.innerHTML = "";
  var shown = tasks.filter(function (t) {
    if (currentFilter === "done") return t.done;
    if (currentFilter === "pending") return !t.done;
    return true;
  });

  if (shown.length === 0) {
    var empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = tasks.length ? "No tasks in this view." : "No tasks yet. Add your first one above!";
    list.appendChild(empty);
  }

  shown.forEach(function (t) {
    var li = document.createElement("li");
    if (t.done) li.className = "done";

    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.done;
    cb.setAttribute("aria-label", "Mark task as completed");
    cb.addEventListener("change", function () { toggleTask(t.id); });

    var body = document.createElement("div");
    body.className = "task-body";
    var title = document.createElement("span");
    title.className = "task-title";
    title.textContent = t.text;
    var meta = document.createElement("span");
    meta.className = "task-meta";
    var badge = document.createElement("span");
    badge.className = "badge " + t.priority;
    badge.textContent = t.priority;
    meta.appendChild(badge);
    meta.appendChild(document.createTextNode(t.due ? "Due: " + t.due : "No due date"));
    body.appendChild(title);
    body.appendChild(meta);

    var del = document.createElement("button");
    del.className = "del";
    del.textContent = "Delete";
    del.addEventListener("click", function () { deleteTask(t.id); });

    li.appendChild(cb); li.appendChild(body); li.appendChild(del);
    list.appendChild(li);
  });

  var done = tasks.filter(function (t) { return t.done; }).length;
  document.getElementById("total").textContent = tasks.length;
  document.getElementById("completed").textContent = done;
  document.getElementById("pending").textContent = tasks.length - done;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var text = input.value.trim();
  if (text === "") {
    errorBox.textContent = "Please enter a task before adding.";
    return;
  }
  errorBox.textContent = "";
  addTask(text, priority.value, dueDate.value);
  form.reset();
  priority.value = "Medium";
  input.focus();
});

document.querySelectorAll(".filters button").forEach(function (b) {
  b.addEventListener("click", function () {
    document.querySelectorAll(".filters button").forEach(function (x) { x.classList.remove("on"); });
    b.classList.add("on");
    currentFilter = b.dataset.filter;
    render();
  });
});

load();
render();
