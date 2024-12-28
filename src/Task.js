import { mainContent } from "./home";
import '../styles/taskStyle.css';
import { 
    format, 
    isPast, 
    isToday, 
    differenceInDays,
    parseISO,
    formatDistanceToNow
} from 'date-fns';

export class Task {
    constructor(title, description, dueDate, isCompleted = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; // Store as ISO string
        this.isCompleted = isCompleted;
        this.id = Date.now();
    }

    getDueDateStatus() {
        try {
            // Ensure we're working with a valid date
            const dueDate = new Date(this.dueDate);
            if (isNaN(dueDate.getTime())) {
                return 'invalid-date';
            }

            if (this.isCompleted) return 'completed';
            if (isPast(dueDate) && !isToday(dueDate)) return 'overdue';
            if (isToday(dueDate)) return 'due-today';
            return 'upcoming';
        } catch (error) {
            console.error('Date parsing error:', error);
            return 'invalid-date';
        }
    }

    getFormattedDueDate() {
        try {
            const dueDate = new Date(this.dueDate);
            if (isNaN(dueDate.getTime())) {
                return 'Invalid date';
            }

            const daysUntilDue = differenceInDays(dueDate, new Date());
            
            if (isToday(dueDate)) {
                return 'Due Today';
            } else if (daysUntilDue < 0) {
                return `Overdue by ${formatDistanceToNow(dueDate)}`;
            } else {
                return `Due ${format(dueDate, 'MMM d, yyyy')} (${formatDistanceToNow(dueDate)} left)`;
            }
        } catch (error) {
            console.error('Date formatting error:', error);
            return 'Invalid date';
        }
    }

    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
        saveTasks();
    }

    renderTask() {
        const taskElement = document.createElement('div');
        const dueDateStatus = this.getDueDateStatus();
        taskElement.className = `task ${this.isCompleted ? 'completed' : ''} ${dueDateStatus}`;
        taskElement.dataset.taskId = this.id;

        const titleElement = document.createElement('h3');
        titleElement.textContent = this.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = this.description;

        const dueDateElement = document.createElement('p');
        dueDateElement.className = 'due-date';
        dueDateElement.textContent = this.getFormattedDueDate();

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons';

        const toggleButton = document.createElement('button');
        toggleButton.textContent = this.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete';
        toggleButton.addEventListener('click', () => {
            this.toggleCompletion();
            taskElement.classList.toggle('completed');
            taskElement.classList.remove('overdue', 'due-today', 'upcoming');
            taskElement.classList.add(this.getDueDateStatus());
            dueDateElement.textContent = this.getFormattedDueDate();
            toggleButton.textContent = this.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete';
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', () => {
            showEditForm(this);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            deleteTask(this.id);
            taskElement.remove();
        });

        buttonContainer.appendChild(toggleButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(dueDateElement);
        taskElement.appendChild(buttonContainer);

        return taskElement;
    }
}

let taskForm = null;
let tasksContainer = null;
let tasks = [];
let isEditing = false;
let editingTaskId = null;

function loadTasksFromStorage() {
    try {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const taskData = JSON.parse(savedTasks);
            tasks = taskData.map(data => {
                const task = new Task(
                    data.title, 
                    data.description, 
                    data.dueDate, 
                    data.isCompleted
                );
                task.id = data.id;
                return task;
            });
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasks = [];
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
    titleInput.id = 'task-title';

    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = 'Task Description';
    descriptionInput.required = true;
    descriptionInput.id = 'task-description';

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.required = true;
    dueDateInput.id = 'task-due-date';
    dueDateInput.min = format(new Date(), 'yyyy-MM-dd');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Task';
    submitButton.id = 'form-submit-btn';

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        resetForm(form);
    });

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateInput);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const dueDateValue = document.getElementById('task-due-date').value;
        const dueDate = new Date(dueDateValue);
        
        if (isNaN(dueDate.getTime())) {
            alert('Please enter a valid date');
            return;
        }

        if (isPast(dueDate) && !isToday(dueDate)) {
            alert('Please select a future date');
            return;
        }

        if (isEditing) {
            updateTask(editingTaskId);
        } else {
            createNewTask();
        }

        resetForm(form);
    });

    return form;
}

function createNewTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-due-date').value;

    const newTask = new Task(title, description, dueDate);
    tasks.push(newTask);
    saveTasks();
    
    tasksContainer.appendChild(newTask.renderTask());
}

function updateTask(taskId) {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-due-date').value;

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].title = title;
        tasks[taskIndex].description = description;
        tasks[taskIndex].dueDate = dueDate;
        saveTasks();
        displayTasks();
    }
}

function showEditForm(task) {
    if (!taskForm) return;

    isEditing = true;
    editingTaskId = task.id;
    
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-description').value = task.description;
    
    // Format the date for the input
    const dueDate = new Date(task.dueDate);
    if (!isNaN(dueDate.getTime())) {
        document.getElementById('task-due-date').value = format(dueDate, 'yyyy-MM-dd');
    }
    
    document.getElementById('form-submit-btn').textContent = 'Update Task';
    taskForm.style.display = 'block';
}

function resetForm(form) {
    form.reset();
    form.style.display = 'none';
    isEditing = false;
    editingTaskId = null;
    document.getElementById('form-submit-btn').textContent = 'Add Task';
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
        if (!isEditing) {
            taskForm.style.display = taskForm.style.display === 'none' ? 'block' : 'none';
        }
    });
    
    mainContent.appendChild(addButton);
}

function sortTasks() {
    tasks.sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return a.isCompleted ? 1 : -1;
    });
}

function displayTasks() {
    sortTasks();
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        tasksContainer.appendChild(task.renderTask());
    });
}

export function loadTask() {
    tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks-container';
    mainContent.appendChild(tasksContainer);

    loadTasksFromStorage();
    displayTasks();
    addTaskBtn();
}