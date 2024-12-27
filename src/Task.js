import { mainContent } from "./home";

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
function addTaskBtn(){
    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = '+';
    mainContent.appendChild(addButton);
}
function addTask()
{
    const form = document.createElement('form');
    form.className = 'task-form';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Task Title';
    titleInput.required = true;

    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = 'Task Description';
    descriptionInput.required = true;

    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = 'Add Task';

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(addButton);

    // Event Listener to Add Tasks
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTask = new Task(titleInput.value, descriptionInput.value);
        tasksContainer.appendChild(newTask.renderTask());

        // Clear inputs after adding the task
        titleInput.value = '';
        descriptionInput.value = ''});
}

// Example usage (can be imported elsewhere)
export function loadTask() {
    addTaskBtn();
    const task1 = new Task('Buy groceries', 'Buy milk, bread, and eggs.');
    const task2 = new Task('Complete project', 'Finish the dashboard module by Friday.');

    const tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks-container';

    tasksContainer.appendChild(task1.renderTask());
    tasksContainer.appendChild(task2.renderTask());

    const mainContent = document.querySelector('.mainContent');
    mainContent.appendChild(tasksContainer);
}
