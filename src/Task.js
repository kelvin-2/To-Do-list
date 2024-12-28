import { mainContent } from "./home";
import '../styles/taskStyle.css';

// Task.js
export class Task {
    constructor(title, description, isCompleted = false) {
        this.title = title; // Title of the task
        this.description = description; // Detailed description of the task
        this.isCompleted = isCompleted; // Status of the task (default: not completed)
    }

    // Method to toggle the task's completion status
    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }

    // Method to display task details as an HTML element
    renderTask() {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${this.isCompleted ? 'completed' : ''}`;

        const titleElement = document.createElement('h3');
        titleElement.textContent = this.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = this.description;

        const toggleButton = document.createElement('button');
        toggleButton.textContent = this.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete';
        toggleButton.addEventListener('click', () => {
            this.toggleCompletion();
            taskElement.classList.toggle('completed');
            toggleButton.textContent = this.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete';
        });

        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(toggleButton);

        return taskElement;
    }
}

let taskForm = null;
let tasksContainer = null;
let tasks = [];

function loadTasksFromStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const taskData = JSON.parse(savedTasks);
        tasks = taskData.map(data => {
            const task = new Task(data.title, data.description, data.isCompleted);
            task.id = data.id;
            return task;
        });
    }
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
}
function createTaskForm() {
    const form = document.createElement('form');
    form.className = 'task-form';
    form.style.display = 'none';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Task Title';
    titleInput.required = true;

    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = 'Task Description';
    descriptionInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Task';

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        form.style.display = 'none';
        form.reset();
    });

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTask = new Task(titleInput.value, descriptionInput.value);
        tasks.push(newTask); // Add to tasks array
        saveTasks(); // Save to localStorage
        
        tasksContainer.appendChild(newTask.renderTask());

        form.reset();
        form.style.display = 'none';
    });

    return form;
}

function addTaskBtn() {
    const addButton = document.createElement('button');
    addButton.className = "addBTN";
    addButton.type = 'button';
    addButton.textContent = '+';
    
    if (!taskForm) {
        taskForm = createTaskForm();
        mainContent.appendChild(taskForm);
    }
    
    addButton.addEventListener('click', () => {
        taskForm.style.display = taskForm.style.display === 'none' ? 'block' : 'none';
    });
    
    mainContent.appendChild(addButton);
}

// Display all tasks from the array
function displayTasks() {
    tasksContainer.innerHTML = ''; // Clear existing tasks
    tasks.forEach(task => {
        tasksContainer.appendChild(task.renderTask());
    });
}

export function loadTask() {
    // Create tasks container
    tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks-container';
    mainContent.appendChild(tasksContainer);

    // Load existing tasks from storage
    loadTasksFromStorage();
    
    // Display existing tasks
    displayTasks();

    // Add the button to create new tasks
    addTaskBtn();
}