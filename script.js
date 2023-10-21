// Define an array of tasks
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
let isEdit = true;
// JavaScript functions for modals
function openAddTaskModal() {
  // Show the "Add Task" modal
  const modalHeading = document.getElementById('modal-heading');
    modalHeading.innerText = "Add new task"
  isEdit= false;
  nameInput.value = ""
  descInput.value= ""
  const submitBtnText = document.getElementById('submitBtn');
  submitBtnText.textContent = "Add task"
  document.getElementById("add-task-modal").style.display = "block";
}

function closeAddTaskModal() {
  // Close the "Add Task" modal
  document.getElementById("add-task-modal").style.display = "none";
}

function closeModal() {
  // Close the task description modal
  document.getElementById("task-modal").style.display = "none";
}
// JavaScript for adding new tasks
const taskForm = document.getElementById("task-form");
const nameInput = document.getElementById("name-input");
const descInput = document.getElementById('desc-input')

let toBeEdited ;
// Event listener to show task description when a task is clicked
document.querySelectorAll(".task-list").forEach((taskList) => {
  taskList.addEventListener("click", (event) => {

    isEdit= true;
    nameInput.value = tasks[event.target.id].title;
    descInput.value= tasks[event.target.id].desc;
   toBeEdited =event.target.id
    const modalHeading = document.getElementById('modal-heading');
    modalHeading.innerText = "Edit task"
    const submitBtnText = document.getElementById('submitBtn');
    submitBtnText.textContent = "Save Changes"
    // Show task description in the modal when a task is clicked
document.getElementById("add-task-modal").style.display = "block";
 
   // document.getElementById("task-desc").value = taskDescription;
    document.getElementById("add-task-modal").style.display = "block";
  });
});



taskForm.addEventListener("submit", (event) => {
 
  event.preventDefault();
  const taskName = nameInput.value;
  const taskDescription = descInput.value;
  if (taskDescription && taskName) {
    
    // Create a new task object and add it to the tasks array

    if(isEdit){

      tasks[toBeEdited].title  = taskName;
   tasks[toBeEdited].desc = taskDescription;

    }else {
      const newTask = {
        title: taskName,
        desc: taskDescription,
        status: "open",
      };
      console.log(newTask)
      tasks.push(newTask);
  
    }
   


    console.log(tasks);
    taskName.value = "";
    taskDescription.value = "";
    loadTasks(); // Refresh the task list
    closeAddTaskModal(); // Close the "Add Task" modal
  }
});

// Function to load tasks into the task boards
const loadTasks = () => {
  // Clear the task boards
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

  // Iterate through tasks and populate the task boards
  tasks.forEach((task, index) => {
    const newTask = document.createElement("li");
    newTask.textContent = task.title;
    newTask.draggable = true;
    newTask.addEventListener("dragstart", drag);
    newTask.id = index;
    document
      .getElementById(task.status)
      .querySelector(".task-list")
      .appendChild(newTask);
  });
};

loadTasks(); // Initial task loading

let draggedItem = null;

// Function to allow dropping of tasks
function allowDrop(event) {
  event.preventDefault();
}

// Function to handle dragging of tasks
function drag(event) {
  draggedItem = event.target.id;
  console.log(event.target.id);
}

// Function to handle dropping of tasks
function drop(event) {
  event.preventDefault();

  const movedTaskId = event.target.id;
  tasks[draggedItem].status = event.target.id;
  loadTasks(); // Refresh the task list
  if (event.target.classList.contains("task-list")) {
    event.target.appendChild(document.getElementById(draggedItem));
  }
}

// Function to open the move task modal
function openMoveTaskModal(event) {
  moveTaskItem = event.target.parentElement;
  document.getElementById("add-task-modal").style.display = "block";
}

// Function to move tasks between sections
function moveTask(destinationSectionId) {
  if (moveTaskItem) {
    const destinationSection = document.getElementById(destinationSectionId);
    destinationSection.querySelector(".task-list").appendChild(moveTaskItem);
    closeMoveTaskModal();
  }
}

// Function to show task status
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
