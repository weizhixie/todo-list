import "./styles.css";
import { Task } from "./task.js";
import { TaskManager } from "./task-manager .js";
import { RenderUI } from "./render-ui.js";
import { Project } from "./project.js";
import { ProjectManager } from "./project-manager.js";

const taskManager = new TaskManager();
const projectManager = new ProjectManager();

const dummyTodoTasks = [
    { title: "Buy groceries", description: "Get milk, eggs, bread, and vegetables from the supermarket.", dueDate: `${new Date().toISOString().split("T")[0]}`, priority: "High", project: "Personal" },
    { title: "Finish project report", description: "Compile research findings and format the final report for submission.", dueDate: "2025-11-15", priority: "High", project: "Work" },
    { title: "Call the plumber", description: "Fix the leaking kitchen sink before the weekend.", dueDate: "2025-11-08", priority: "Normal", project: "Personal" },
    { title: "Plan weekend trip", description: "Book accommodation and plan itinerary for the short getaway.", dueDate: "2025-11-12", priority: "Low", project: "Personal" },
    { title: "Team meeting", description: "Discuss project milestones and assign upcoming tasks.", dueDate: "2025-12-09", priority: "Normal", project: "Work" },
    { title: "Renew car insurance", description: "Check available plans and renew policy before expiration date.", dueDate: "2025-12-20", priority: "High", project: "Personal" },
    { title: "Workout session", description: "Complete a 1-hour gym session focused on strength training.", dueDate: "2025-12-07", priority: "Low", project: "Personal" },
    { title: "Read a new book", description: "Start reading 'Atomic Habits' and finish at least 3 chapters.", dueDate: "2026-10-18", priority: "Low", project: "Personal" },
    { title: "Submit tax documents", description: "Gather all financial records and submit to the accountant.", dueDate: "2026-10-25", priority: "High", project: "Work" },
    { title: "Organize workspace", description: "Clean desk area and organize files for better productivity.", dueDate: "2026-10-11", priority: "Normal", project: "Work" }
];

dummyTodoTasks.forEach((taskData) => {
    const newTask = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
    taskManager.create(newTask);
    addTaskToProject(newTask, taskData.project);
});

const todoUI = new RenderUI(document.body, {
    onAddTaskFormSubmit: (taskData) => {
        const newTask = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
        taskManager.create(newTask);
        addTaskToProject(newTask, taskData.project);
        todoUI.updateTasksDisplay(getTasksWithProjects(taskManager.listAll()));
        todoUI.updateProjectsDisplay(projectManager.listAll());
    },
    onEditTaskFormSubmit: (task, taskData) => {
        taskManager.update(task.id, taskData);
        projectManager.update(task.projectId, taskData.project);
        todoUI.updateTasksDisplay(getTasksWithProjects(taskManager.listAll()));
    },
    onDeleteTaskBtnClick: (task) => {
        taskManager.delete(task.id);
        projectManager.deleteTaskFromProject(task.id);
        todoUI.updateTasksDisplay(getTasksWithProjects(taskManager.listAll()));
    },
    getTasksDueToday: () => todoUI.updateTasksDisplay(getTasksWithProjects(taskManager.listTasksDueToday())),
    getAllTasks: () => todoUI.updateTasksDisplay(getTasksWithProjects(taskManager.listAll())),
    getTasksUpcoming: () => todoUI.updateTasksDisplay(getTasksWithProjects(taskManager.listTasksUpcoming())),
    getTasksCompleted: () => todoUI.updateTasksDisplay(getTasksWithProjects(taskManager.listTasksCompleted())),
    onToggleCompleted: (task) => {
        taskManager.toggleCompleted(task.id);
        todoUI.updateTasksDisplay(getTasksWithProjects(taskManager.listAll()));
    },
});

todoUI.renderTasks(getTasksWithProjects(taskManager.listAll()));
todoUI.renderProjectList(projectManager.listAll());

function getTasksWithProjects(tasks) {
    return tasks.map(task => {
        const project = projectManager.findProjectOfTask(task.id);
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            completed: task.completed,
            projectId: project.id,
            projectName: project.name,
        };
    });
}

function addTaskToProject(task, projectName) {
    let newProject = projectManager.findProjectByName(projectName);

    if (!newProject) {
        newProject = new Project(projectName);
        projectManager.create(newProject);
    }

    newProject.addTask(task);
}