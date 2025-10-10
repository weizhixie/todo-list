import "./styles.css";
import { Task } from "./task.js";
import { TaskManager } from "./task-manager .js";
import { RenderUI } from "./render-ui.js";

const taskManager = new TaskManager();

const dummyTodoTasks = [
    { title: "Buy groceries", description: "Get milk, eggs, bread, and vegetables from the supermarket.", dueDate: "2025-10-10", priority: "High" },
    { title: "Finish project report", description: "Compile research findings and format the final report for submission.", dueDate: "2025-10-15", priority: "High" },
    { title: "Call the plumber", description: "Fix the leaking kitchen sink before the weekend.", dueDate: "2025-10-08", priority: "Normal" },
    { title: "Plan weekend trip", description: "Book accommodation and plan itinerary for the short getaway.", dueDate: "2025-10-12", priority: "Low" },
    { title: "Team meeting", description: "Discuss project milestones and assign upcoming tasks.", dueDate: "2025-10-09", priority: "Normal" },
    { title: "Renew car insurance", description: "Check available plans and renew policy before expiration date.", dueDate: "2025-10-20", priority: "High" },
    { title: "Workout session", description: "Complete a 1-hour gym session focused on strength training.", dueDate: "2025-10-07", priority: "Low" },
    { title: "Read a new book", description: "Start reading 'Atomic Habits' and finish at least 3 chapters.", dueDate: "2025-10-18", priority: "Low" },
    { title: "Submit tax documents", description: "Gather all financial records and submit to the accountant.", dueDate: "2025-10-25", priority: "High" },
    { title: "Organize workspace", description: "Clean desk area and organize files for better productivity.", dueDate: "2025-10-11", priority: "Normal" }
];

dummyTodoTasks.forEach((taskData) => {
    const newTask = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
    taskManager.create(newTask);
});

const todoUI = new RenderUI(document.body, {
    onAddTaskFormSubmit: (taskData) => {
        const newTask = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
        taskManager.create(newTask);
        todoUI.updateTasksDisplay(taskManager.listAll());
    }
});

todoUI.updateTasksDisplay(taskManager.listAll());
