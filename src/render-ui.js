export class RenderUI {
    constructor(body, eventHandlers) {
        this.body = body;
        this.eventHandlers = eventHandlers;
        this.body.append(this.renderHeader(), this.renderMainSection(), this.renderFooter());
    }

    renderHeader() {
        const header = document.createElement("header");
        header.classList.add("header");
        header.textContent = `Header`;
        return header;
    }

    renderMainSection() {
        const mainSection = document.createElement("main");
        mainSection.classList.add("main-section");

        const sideBarContainer = document.createElement("aside");
        sideBarContainer.classList.add("side-bar-container");

        const todosContainer = document.createElement("div");
        todosContainer.classList.add("todos-container");

        const addTaskBtn = document.createElement("button");
        addTaskBtn.classList.add("add-task-btn");
        addTaskBtn.textContent = `\u2295 Add Task`;
        addTaskBtn.addEventListener("click", () => this.openTaskModal("add-task"));

        sideBarContainer.appendChild(this.renderSideBar());
        todosContainer.appendChild(addTaskBtn);
        mainSection.append(sideBarContainer, todosContainer);

        return mainSection;
    }

    handleSideBarNav(sideBarNav) {
        const sideBarAll = sideBarNav.querySelector("#sidebar-all");
        sideBarAll.addEventListener("click", () => this.eventHandlers.showAllTasks());

        const sideBarToday = sideBarNav.querySelector("#sidebar-today");
        sideBarToday.addEventListener("click", () => this.eventHandlers.showTasksDueToday());

        const sideBarUpcoming = sideBarNav.querySelector("#sidebar-upcoming");
        sideBarUpcoming.addEventListener("click", () => this.eventHandlers.showTasksUpcoming());

        const sideBarCompleted = sideBarNav.querySelector("#sidebar-completed");
        sideBarCompleted.addEventListener("click", () => this.eventHandlers.showTasksCompleted());
    }

    renderSideBar() {
        const sideBarNav = document.createElement("nav");
        const menuList = document.createElement("menu");

        const menuItems = [
            { text: "All", id: "sidebar-all" },
            { text: "Today", id: "sidebar-today" },
            { text: "Upcoming", id: "sidebar-upcoming" },
            { text: "Completed", id: "sidebar-completed" },
        ];

        menuItems.forEach((item) => {
            const menuItem = document.createElement("li");
            menuItem.classList.add("sidebar-menu-item");
            menuItem.setAttribute("id", item.id);
            menuItem.textContent = item.text;
            menuList.appendChild(menuItem);
            menuItem.addEventListener("click", (e) => {
                document.querySelectorAll(".sidebar-menu-item").forEach((el) => {
                    el.classList.remove("sidebar-highlight");
                });
                e.currentTarget.classList.add("sidebar-highlight");
            });
        });

        const projectsHdrWrapper = document.createElement("div");
        projectsHdrWrapper.classList.add("projects-hdr-wrapper");

        const projectsHeader = document.createElement("h3");
        projectsHeader.textContent = "Projects";

        const addProjectIcon = document.createElement("p");
        addProjectIcon.classList.add("add-project-icon");
        addProjectIcon.textContent = `\u2295`;
        addProjectIcon.addEventListener("click", () => this.openProjectModal("add-project"));

        projectsHdrWrapper.append(projectsHeader, addProjectIcon);

        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");

        sideBarNav.append(menuList, projectsHdrWrapper, projectContainer);
        this.handleSideBarNav(sideBarNav);

        return sideBarNav;
    }

    openProjectModal(mode, project) {
        const existingModal = this.body.querySelector(".project-modal");
        if (existingModal) {
            existingModal.remove();
        }

        const projectModal = document.createElement("dialog");
        projectModal.classList.add("project-modal");

        if (mode === "add-project") {
            projectModal.appendChild(this.createAddProjectForm());
        } else {
            projectModal.appendChild(this.createEditProjectForm(project));
        }

        this.body.appendChild(projectModal);
        projectModal.showModal();
    }

    createAddProjectForm() {
        const form = this.createBaseProjectForm("Add Project", "Add");
        const nameInput = form.querySelector("#project-name");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (nameInput.value.trim()) {
                this.eventHandlers.addNewProject(nameInput.value.trim());
                this.body.querySelector(".project-modal").close();
            }
        });

        return form;
    }

    createEditProjectForm(project) {
        const form = this.createBaseProjectForm("Edit Project", "Edit");
        const nameInput = form.querySelector("#project-name");
        nameInput.value = project.name;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (nameInput.value.trim()) {
                this.eventHandlers.editProject(project, nameInput.value.trim());
                this.body.querySelector(".project-modal").close();
            }
        });

        return form;
    }

    createBaseProjectForm(header, btnContent) {
        const form = document.createElement("form");
        form.classList.add("project-form");

        const projectFormHeader = document.createElement("h2");
        projectFormHeader.classList.add("project-form-header");
        projectFormHeader.textContent = header;

        const projectInputWrapper = document.createElement("div");
        projectInputWrapper.classList.add("project-input-wrapper");

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Project";
        nameLabel.htmlFor = "project-name";

        const nameInput = document.createElement("input");
        nameInput.classList.add("project-input");
        nameInput.setAttribute("id", "project-name");
        nameInput.setAttribute("name", "project-name");
        nameInput.setAttribute("type", "text");
        nameInput.required = true;

        projectInputWrapper.append(nameLabel, nameInput);

        const projectFormBtnWrapper = document.createElement("div");
        projectFormBtnWrapper.classList.add("project-form-btn-wrapper");

        const submitBtn = document.createElement("button");
        submitBtn.classList.add("submit-project-btn");
        submitBtn.textContent = btnContent;

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("cancel-btn");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.body.querySelector(".project-modal").close();
        });

        projectFormBtnWrapper.append(cancelBtn, submitBtn);

        const xSignCloseBtn = document.createElement("button");
        xSignCloseBtn.classList.add("x-sign-close-btn");
        xSignCloseBtn.textContent = '\u2715';
        xSignCloseBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.body.querySelector(".project-modal").close();
        });

        form.append(projectFormHeader, projectInputWrapper, projectFormBtnWrapper, xSignCloseBtn);

        return form;
    }

    updateProjectsDisplay(projects) {
        const projectContainer = this.body.querySelector(".project-container");
        projectContainer.textContent = "";
        this.renderProjectList(projects);
    }

    renderProjectList(projects) {
        const projectContainer = this.body.querySelector(".project-container");
        const projectMenu = document.createElement("menu");

        projects.forEach((project) => {
            const projectItem = document.createElement("li");
            projectItem.classList.add("sidebar-menu-item");
            projectItem.setAttribute("id", `project-${project.name}`);
            projectItem.textContent = project.name;
            projectItem.addEventListener("click", (e) => {
                document.querySelectorAll(".sidebar-menu-item").forEach((el) => {
                    el.classList.remove("sidebar-highlight");
                });
                e.currentTarget.classList.add("sidebar-highlight");
            });

            const projectBtnWrapper = document.createElement("div");
            projectBtnWrapper.classList.add("project-btn-wrapper");

            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.openProjectModal("edit-project", project);
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (window.confirm("Do you really want to delete this project?")) {
                    this.eventHandlers.deleteProject(project);
                }
            });

            projectBtnWrapper.append(editBtn, deleteBtn);
            projectItem.append(projectBtnWrapper);
            projectMenu.append(projectItem);
            projectItem.addEventListener("click", () => this.eventHandlers.showProjectTasks(project));
        });

        projectContainer.appendChild(projectMenu);
    }

    openTaskModal(mode, task) {
        const existingModal = this.body.querySelector(".task-modal");
        if (existingModal) {
            existingModal.remove();
        }

        const taskModal = document.createElement("dialog");
        taskModal.classList.add("task-modal");

        const xSignCloseBtn = document.createElement("button");
        xSignCloseBtn.classList.add("x-sign-close-btn");
        xSignCloseBtn.textContent = '\u2715';
        xSignCloseBtn.addEventListener("click", () => taskModal.close());

        if (mode === "add-task") {
            taskModal.append(this.createAddTaskForm(), xSignCloseBtn);
        } else {
            taskModal.append(this.createEditTaskForm(task), xSignCloseBtn);
        }

        this.body.appendChild(taskModal);
        taskModal.showModal();
    }

    createAddTaskForm() {
        const taskForm = this.createBaseTaskForm("Add task", "Add Task");

        const todoProject = taskForm.querySelector("#todo-project");
        this.eventHandlers.returnProjects().forEach((project, key) => {
            todoProject.options[key] = new Option(project.name, project.name);
        });

        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleAddTaskFormSubmit(taskForm);
        });

        return taskForm;
    }

    handleAddTaskFormSubmit(taskForm) {
        const taskData = this.parseTaskFormData(taskForm);

        //callback when form submits
        this.eventHandlers.addNewTask(taskData);

        this.body.querySelector(".task-modal").close();
        taskForm.reset();
    }

    createEditTaskForm(task) {
        const taskForm = this.createBaseTaskForm("Edit task", "Update Task");

        taskForm.querySelector("#todo-title").value = task.title;
        taskForm.querySelector("#todo-description").value = task.description;
        taskForm.querySelector("#todo-dueDate").value = task.dueDate;
        taskForm.querySelector("#priority-select").value = task.priority;

        const todoProject = taskForm.querySelector("#todo-project");
        this.eventHandlers.returnProjects().forEach((project, key) => {
            todoProject.options[key] = new Option(project.name, project.name);
        });

        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleEditTaskFormSubmit(taskForm, task);
        });

        return taskForm;
    }

    handleEditTaskFormSubmit(taskForm, task) {
        const taskData = this.parseTaskFormData(taskForm);

        this.eventHandlers.editTask(task, taskData);

        this.body.querySelector(".task-modal").close();
    }

    handleDeleteTask(task) {
        this.eventHandlers.deleteTask(task);
    }

    updateTasksDisplay(tasks) {
        const todosContainer = this.body.querySelector(".todos-container");
        const addTaskBtn = todosContainer.querySelector(".add-task-btn");

        todosContainer.textContent = "";
        todosContainer.appendChild(addTaskBtn);

        if (tasks.length === 0) {
            const emptyTodo = document.createElement("p");
            emptyTodo.textContent = "No task yet.";
            todosContainer.appendChild(emptyTodo);
        } else {
            this.renderTasks(tasks);
        }
    }

    parseTaskFormData(taskForm) {
        // Create key-value pairs from form elements, e.g. key = "todo-title", value = user input 
        const formData = new FormData(taskForm);

        if (!formData.get("todo-title").trim()) {
            alert("Please enter a title.");
            return;
        }

        //if date is not select, set it to today
        if (!formData.get("todo-dueDate")) {
            formData.set("todo-dueDate", new Date().toISOString().split("T")[0]);
        }

        return {
            title: formData.get("todo-title"),
            description: formData.get("todo-description"),
            dueDate: formData.get("todo-dueDate"),
            priority: formData.get("priority-select"),
            project: formData.get("todo-project").trim(),
        };
    }

    renderTasks(tasks) {
        const todosContainer = this.body.querySelector(".todos-container");
        const priorityClr = { Low: "#7CFC00", Normal: "#FFA500", High: "#D64933" };

        tasks.forEach((task) => {
            const taskItem = document.createElement("p");
            taskItem.classList.add("task-item");
            taskItem.style.borderLeft = `3px solid ${priorityClr[task.priority]}`;

            const taskWrapperLeft = document.createElement("div");
            taskWrapperLeft.classList.add("task-wrapper-left");

            const completeToggle = document.createElement("input");
            completeToggle.classList.add("complete-toggle");
            completeToggle.type = "checkbox";
            completeToggle.checked = task.completed;

            const title = document.createElement("p");
            title.textContent = ` ${task.title}`;
            if (task.completed) {
                title.classList.add("task-complete");
            }

            completeToggle.addEventListener("change", () => {
                this.eventHandlers.toggleTaskCompletion(task);
                //set task-complete to be present if task.completed is truthy, and absent if it's falsy
                title.classList.toggle("task-complete", task.completed);
            });

            const taskWrapperRight = document.createElement("div");
            taskWrapperRight.classList.add("task-wrapper-right");

            const dueDate = document.createElement("p");
            dueDate.textContent = `${task.dueDate}`;

            const detailBtn = document.createElement("button");
            detailBtn.classList.add("detail-btn");
            detailBtn.textContent = "Details";
            detailBtn.addEventListener("click", () => this.openTodoDetail(task));

            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => this.openTaskModal("edit-task", task));

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => this.handleDeleteTask(task));

            taskWrapperLeft.append(completeToggle, title);
            taskWrapperRight.append(dueDate, detailBtn, editBtn, deleteBtn);
            taskItem.append(taskWrapperLeft, taskWrapperRight);
            todosContainer.appendChild(taskItem);
        });
    }

    openTodoDetail(task) {
        let todoDetailModal = this.body.querySelector(".todo-detail-modal") || this.createTodoDetailModal();

        todoDetailModal.querySelector(".todo-detail-title").textContent = task.title;
        todoDetailModal.querySelector(".todo-detail-desc").textContent = `Details: ${task.description}`;
        todoDetailModal.querySelector(".todo-detail-due").textContent = `DueDate: ${task.dueDate}`;
        todoDetailModal.querySelector(".todo-detail-priority").textContent = `Priority: ${task.priority}`;
        todoDetailModal.querySelector(".todo-detail-project").textContent = `Project: ${task.projectName}`;

        todoDetailModal.showModal();
    }

    createTodoDetailModal() {
        const todoDetailModal = document.createElement("dialog");
        todoDetailModal.classList.add("todo-detail-modal");

        const todoDetailTitle = document.createElement("h2");
        todoDetailTitle.classList.add("todo-detail-title");

        const todoDetailDesc = document.createElement("p");
        todoDetailDesc.classList.add("todo-detail-desc", "todo-detail-para");

        const todoDetailDue = document.createElement("p");
        todoDetailDue.classList.add("todo-detail-due", "todo-detail-para");

        const todoDetailPriority = document.createElement("p");
        todoDetailPriority.classList.add("todo-detail-priority", "todo-detail-para");

        const todoDetailProject = document.createElement("p");
        todoDetailProject.classList.add("todo-detail-project", "todo-detail-para");

        const xSignCloseBtn = document.createElement("button");
        xSignCloseBtn.classList.add("x-sign-close-btn");
        xSignCloseBtn.textContent = '\u2715';
        xSignCloseBtn.addEventListener("click", () => todoDetailModal.close());

        const closeDetailBtn = document.createElement("button");
        closeDetailBtn.classList.add("close-detail-btn");
        closeDetailBtn.textContent = "Close Detail";
        closeDetailBtn.addEventListener("click", () => todoDetailModal.close());

        todoDetailModal.append(todoDetailTitle, todoDetailDesc, todoDetailDue, todoDetailPriority, todoDetailProject, xSignCloseBtn, closeDetailBtn);
        this.body.append(todoDetailModal);

        return todoDetailModal;
    }

    createBaseTaskForm(header, btnContent) {
        const taskForm = document.createElement("form");
        taskForm.classList.add("task-form");

        const taskFormHeader = document.createElement("h2");
        taskFormHeader.classList.add("task-form-header");
        taskFormHeader.textContent = header;
        taskForm.appendChild(taskFormHeader);

        const taskFormFields = [{
            label: "Title*",
            input: { tagName: "input", type: "text", name: "todo-title", id: "todo-title", required: true }
        }, {
            label: "Description",
            input: { tagName: "textarea", name: "todo-description", id: "todo-description", rows: 5 }
        }, {
            label: "Due Date",
            input: { tagName: "input", type: "date", name: "todo-dueDate", id: "todo-dueDate", min: `${new Date().toISOString().split("T")[0]}` }
        }, {
            label: "Priority",
            input: { tagName: "select", name: "priority-select", id: "priority-select" },
            options: [
                { value: "Low", text: "Low" },
                { value: "Normal", text: "Normal" },
                { value: "High", text: "High" }
            ]
        }, {
            label: "Project",
            input: { tagName: "select", name: "todo-project", id: "todo-project" },
            options: [
                { value: "Default", text: "Default" }
            ]
        }];

        taskFormFields.forEach((field) => {
            const formWrapper = document.createElement("div");
            formWrapper.classList.add("task-form-wrapper");

            const label = document.createElement("label");
            label.htmlFor = field.input.id;
            label.textContent = field.label;

            const input = document.createElement(field.input.tagName);
            input.classList.add("task-input");
            for (const key in field.input) {
                if (key !== "tagName") {
                    input.setAttribute(key, field.input[key]);
                }
            }

            if (field.input.tagName === "select" && field.options) {
                field.options.forEach(optData => {
                    const option = document.createElement("option");
                    option.value = optData.value;
                    option.textContent = optData.text;
                    input.appendChild(option);
                });
            }
            formWrapper.append(label, input);
            taskForm.appendChild(formWrapper);
        });

        const taskFormBtnWrapper = document.createElement("div");
        taskFormBtnWrapper.classList.add("task-form-wrapper", "task-form-btn-wrapper");

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("cancel-btn");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.body.querySelector(".task-modal").close();
        });

        const submitBtn = document.createElement("button");
        submitBtn.classList.add("submit-task-btn");
        submitBtn.textContent = btnContent;

        taskFormBtnWrapper.append(cancelBtn, submitBtn);
        taskForm.appendChild(taskFormBtnWrapper);

        return taskForm;
    }

    renderFooter() {
        const footer = document.createElement("footer");
        footer.classList.add("footer");
        footer.textContent = "Footer";
        return footer;
    }
}