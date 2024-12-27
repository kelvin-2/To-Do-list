import { mainContent } from "./home";

// Array to store tasks (Example data structure)
let tasks = [];

function addTask(task, finishDate) {
    // Add the task to the tasks array
    tasks.push({ task, finishDate, completed: false });

    // Re-render the tasks after adding the new one
    renderTasks();
}

function showTaskForm() {
    const todoForm = document.getElementById("todoForm");
    if (todoForm) {
        todoForm.style.display = "block"; // Show the form
    }
}

function createTodoForm() {
    // Create the form element
    const todoForm = document.createElement("form");
    todoForm.id = "todoForm";

    // Create the task input
    const taskLabel = document.createElement("label");
    taskLabel.setAttribute("for", "task");
    taskLabel.textContent = "Task:";
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.id = "task";
    taskInput.name = "task";
    taskInput.required = true;

    // Create the finish date input
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "finishDate");
    dateLabel.textContent = "Finish Date:";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "finishDate";
    dateInput.name = "finishDate";
    dateInput.required = true;

    // Create the submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Task";

    // Append inputs and labels to the form
    todoForm.appendChild(taskLabel);
    todoForm.appendChild(taskInput);
    todoForm.appendChild(dateLabel);
    todoForm.appendChild(dateInput);
    todoForm.appendChild(submitButton);

    // Append the form to the container
    mainContent.appendChild(todoForm);

    // Handle form submission to add tasks
    todoForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh on form submit

        // Get the values from the form
        const task = document.getElementById("task").value.trim();
        const finishDate = document.getElementById("finishDate").value.trim();

        if (task && finishDate) {
            addTask(task, finishDate); // Add task to the list
            todoForm.reset(); // Reset the form
        }
    });
}

function createAddTaskButton() {
    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.id = "addTaskButton";
    mainContent.appendChild(addButton);

    // Event listener for showing the form
    addButton.addEventListener("click", () => {
        showTaskForm();
    });
}

function renderTasks() {
    const todoList = document.getElementById("todoList");

    // If the todoList doesn't exist, create it
    if (!todoList) {
        const newTodoList = document.createElement("div");
        newTodoList.id = "todoList";
        mainContent.appendChild(newTodoList);
    }

    // Clear the current list
    const list = document.getElementById("todoList");
    list.innerHTML = "";

    // Add each task as a card to the list
    tasks.forEach((taskObj, index) => {
        const taskCard = document.createElement("div");
        taskCard.className = "taskCard";

        // Task Name
        const taskName = document.createElement("p");
        taskName.textContent = taskObj.task;

        // Apply strikethrough if the task is completed
        if (taskObj.completed) {
            taskName.style.textDecoration = "line-through";
            taskCard.style.backgroundColor = "#d3ffd3"; // Light green background for completed tasks
        }

        // Finish Date
        const finishDate = document.createElement("p");
        finishDate.textContent = `Finish by: ${taskObj.finishDate}`;

        // Checkbox for task completion
        const checkboxLabel = document.createElement("label");
        checkboxLabel.textContent = "Completed";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = taskObj.completed;

        // Event listener for checkbox change
        checkbox.addEventListener("change", () => {
            taskObj.completed = checkbox.checked;
            renderTasks(); // Re-render to update the task state
        });

        // Append the elements to the task card
        taskCard.appendChild(taskName);
        taskCard.appendChild(finishDate);
        taskCard.appendChild(checkboxLabel);
        taskCard.appendChild(checkbox);

        // Append the card to the todo list
        list.appendChild(taskCard);
    });
}

// Function to load the tasks
export function loadTask() {
 
    createAddTaskButton();
    createTodoForm();
}
