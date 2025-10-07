import "./styles.css";
import { Task } from "./task.js";
import { TaskManager } from "./task-manager .js";
import { renderUI } from "./render-ui.js";

const todoUI = new renderUI(document.body);
const taskManager = new TaskManager();

const dummyTodoTasks = [
    { title: "Buy groceries", description: "Get milk, eggs, bread, and vegetables from the supermarket.", dueDate: "10/10/2025", priority: "High" },
    { title: "Finish project report", description: "Compile research findings and format the final report for submission.", dueDate: "15/10/2025", priority: "High" },
    { title: "Call the plumber", description: "Fix the leaking kitchen sink before the weekend.", dueDate: "08/10/2025", priority: "Normal" },
    { title: "Plan weekend trip", description: "Book accommodation and plan itinerary for the short getaway.", dueDate: "12/10/2025", priority: "Low" },
    { title: "Team meeting", description: "Discuss project milestones and assign upcoming tasks.", dueDate: "09/10/2025", priority: "Normal" },
    { title: "Renew car insurance", description: "Check available plans and renew policy before expiration date.", dueDate: "20/10/2025", priority: "High" },
    { title: "Workout session", description: "Complete a 1-hour gym session focused on strength training.", dueDate: "07/10/2025", priority: "Low" },
    { title: "Read a new book", description: "Start reading 'Atomic Habits' and finish at least 3 chapters.", dueDate: "18/10/2025", priority: "Low" },
    { title: "Submit tax documents", description: "Gather all financial records and submit to the accountant.", dueDate: "25/10/2025", priority: "High" },
    { title: "Organize workspace", description: "Clean desk area and organize files for better productivity.", dueDate: "11/10/2025", priority: "Normal" }
];

dummyTodoTasks.forEach((taskData) => {
    const newTask = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
    taskManager.create(newTask);
});

todoUI.renderTasks(taskManager.listAll());
