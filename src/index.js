import "./styles.css";
import { Task } from "./task.js";
import { TaskManager } from "./task-manager .js";
import { RenderUI } from "./render-ui.js";
import { Project } from "./project.js";
import { ProjectManager } from "./project-manager.js";
import { WebStorage } from "./web-storage.js";

const taskManager = new TaskManager();
const projectManager = new ProjectManager();
const webStorage = new WebStorage();
let currentView = "all";
let currentProject = null;

if (!localStorage.getItem("todoData")) {
    const dummyTodoTasks = [
        { title: "Buy groceries", description: "Get milk, eggs, bread, and vegetables from the supermarket.", dueDate: `${new Date().toISOString().split("T")[0]}`, priority: "High", project: "Default" },
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

    webStorage.save(taskManager, projectManager);
}
else {
    const storedData = webStorage.load();

    storedData.tasks.forEach((taskData) => {
        const newTask = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority, taskData.completed, taskData.id);
        taskManager.create(newTask);
    });

    storedData.projects.forEach((projectData) => {
        addTaskToProject(null, projectData.name);
    });

    // Assign tasks to projects
    storedData.tasks.forEach((taskData) => {
        const task = taskManager.listAll().find(task => task.id === taskData.id);
        addTaskToProject(task, taskData.projectName);
    });
}

const todoUI = new RenderUI(document.body, {
    addNewTask: (taskData) => {
        const newTask = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
        taskManager.create(newTask);
        addTaskToProject(newTask, taskData.project);

        webStorage.save(taskManager, projectManager);
        refreshCurrentView();
        todoUI.updateProjectsDisplay(projectManager.listAll());
    },
    editTask: (task, taskData) => {
        taskManager.update(task.id, taskData);
        const oldProject = projectManager.findProjectOfTask(task.id);
        if (oldProject.name !== taskData.project) {
            const taskIndex = oldProject.tasks.findIndex(t => t.id === task.id);
            /* [movedTask] is array destructuring, it extract the first task from splice() return */
            const [movedTask] = oldProject.tasks.splice(taskIndex, 1);
            addTaskToProject(movedTask, taskData.project);
        }

        webStorage.save(taskManager, projectManager);
        refreshCurrentView();
        todoUI.updateProjectsDisplay(projectManager.listAll());
    },
    deleteTask: (task) => {
        taskManager.delete(task.id);
        projectManager.deleteTaskFromProject(task.id);

        webStorage.save(taskManager, projectManager);
        refreshCurrentView();
    },
    showTasksDueToday: () => {
        currentView = "today";
        currentProject = null;

        refreshCurrentView();
    },
    showAllTasks: () => {
        currentView = "all";
        currentProject = null;

        refreshCurrentView();
    },
    showTasksUpcoming: () => {
        currentView = "upcoming";
        currentProject = null;

        refreshCurrentView();
    },
    showTasksCompleted: () => {
        currentView = "completed";
        currentProject = null;

        refreshCurrentView();
    },
    toggleTaskCompletion: (task) => {
        taskManager.toggleCompleted(task.id);

        webStorage.save(taskManager, projectManager);
        refreshCurrentView();
    },
    showProjectTasks: (project) => {
        currentView = "project";
        currentProject = project;

        refreshCurrentView();
    },
    addNewProject: (projectName) => {
        let newProject = projectManager.findProjectByName(projectName);
        if (!newProject) {
            projectManager.create(new Project(projectName));
        } else {
            alert(`Project ${projectName} already exists`);
        }

        webStorage.save(taskManager, projectManager);
        refreshCurrentView();
        todoUI.updateProjectsDisplay(projectManager.listAll());
    },
    deleteProject: (project) => {
        const [removedProject] = projectManager.delete(project.id);
        removedProject.tasks.forEach(task => taskManager.delete(task.id));

        webStorage.save(taskManager, projectManager);
        refreshCurrentView();
        todoUI.updateProjectsDisplay(projectManager.listAll());
    },
    editProject: (project, projectName) => {
        if (!projectManager.findProjectByName(projectName)) {
            projectManager.update(project.id, projectName);
        } else {
            alert(`Project ${projectName} already exists`);
        }

        webStorage.save(taskManager, projectManager);
        refreshCurrentView();
        todoUI.updateProjectsDisplay(projectManager.listAll());
    },
    returnProjects: () => projectManager.listAll()
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

    if (task) {
        newProject.addTask(task);
    }
}

function refreshCurrentView() {
    const views = {
        "today": () => getTasksWithProjects(taskManager.listTasksDueToday()),
        "all": () => getTasksWithProjects(taskManager.listAll()),
        "upcoming": () => getTasksWithProjects(taskManager.listTasksUpcoming()),
        "completed": () => getTasksWithProjects(taskManager.listTasksCompleted()),
        "project": () => {
            if (!projectManager.listByProject(currentProject.id)) {
                return views["all"]();
            }
            return getTasksWithProjects(currentProject.tasks);
        }
    };

    todoUI.updateTasksDisplay(views[currentView]());
}