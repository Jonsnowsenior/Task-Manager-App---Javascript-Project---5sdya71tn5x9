const tasks = [
  {
    title: "task1",
    desc: "task 1 desc",
    status: "open",
  },
  {
    title: "task2",
    desc: "task 2 desc",
    status: "in-progress",
  },
  {
    title: "task3",
    desc: "task 3 desc",
    status: "in-review",
  },
  {
    title: "task4",
    desc: "task 4 desc",
    status: "done",
  },
];

// JavaScript for modals
function openAddTaskModal() {
  document.getElementById("add-task-modal").style.display = "block";
}

function closeAddTaskModal() {
  document.getElementById("add-task-modal").style.display = "none";
}

function closeModal() {
  document.getElementById("task-modal").style.display = "none";
}

// JavaScript to handle task description modal
document.querySelectorAll(".task-list").forEach((taskList) => {
  taskList.addEventListener("click", (event) => {
    const taskDescription = event.target.textContent;
    document.getElementById("task-description").textContent = taskDescription;
    document.getElementById("task-modal").style.display = "block";
  });
});

// JavaScript for adding new tasks
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDescription = taskInput.value;
  if (taskDescription) {
    const newTask = {
      title: taskDescription,
      desc: taskDescription,
      status: "open",
    };
    tasks.push(newTask);
    console.log(tasks);
    taskInput.value = "";
    loadTasks();
    closeAddTaskModal();
  }
});

const loadTasks = () => {
  //clear the board
  const removeOpen = document.getElementById("openTasks");
  while (removeOpen.firstChild) {
    removeOpen.firstChild.remove();
  }
  const removeInProgress = document.getElementById("inProgressTasks");
  while (removeInProgress.firstChild) {
    removeInProgress.firstChild.remove();
  }
  const removeInReview = document.getElementById("inReviewTasks");
  while (removeInReview.firstChild) {
    removeInReview.firstChild.remove();
  }
  const removeDone = document.getElementById("doneTasks");
  while (removeDone.firstChild) {
    removeDone.firstChild.remove();
  }

  tasks.map((task, index) => {
    const newTask = document.createElement("li");
    newTask.textContent = task.title;
    newTask.draggable = true;
    newTask.addEventListener("dragstart", drag);
    newTask.id = index;
    // const deleteButton = document.createElement("i");
    // deleteButton.classList.add("fa");
    // deleteButton.classList.add("fa-trash-o");
    // newTask.appendChild(deleteButton);
    document
      .getElementById(task.status)
      .querySelector(".task-list")
      .appendChild(newTask);
  });
};

loadTasks();


let draggedItem = null;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedItem = event.target.id;
  console.log(event.target.id);
}

function drop(event) {
  event.preventDefault();

  const movedTaskId = event.target.id;
  tasks[draggedItem].status = event.target.id;
  loadTasks();
  if (event.target.classList.contains("task-list")) {
    event.target.appendChild(draggedItem);
  }
}

// to move tasks between sections
function openMoveTaskModal(event) {
  moveTaskItem = event.target.parentElement;
  document.getElementById("add-task-modal").style.display = "block";
}

function moveTask(destinationSectionId) {
  if (moveTaskItem) {
    const destinationSection = document.getElementById(destinationSectionId);
    destinationSection.querySelector(".task-list").appendChild(moveTaskItem);
    closeMoveTaskModal();
  }
}

//  to show task status
function showTaskStatus() {
  const sections = document.querySelectorAll(".section");
  const taskStatus = {};

  sections.forEach((section) => {
    const sectionId = section.id;
    const taskCount = section.querySelectorAll("li").length;
    taskStatus[sectionId] = taskCount;
  });

  alert(JSON.stringify(taskStatus, null, 2));
}
