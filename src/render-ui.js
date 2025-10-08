export class renderUI {
    constructor(body) {
        this.body = body;
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

        const sideBar = document.createElement("aside");
        sideBar.classList.add("side-bar");
        sideBar.textContent = `Side bar`;

        const todosContainer = document.createElement("div");
        todosContainer.classList.add("todos-container");

        const addTaskBtn = document.createElement("button");
        addTaskBtn.classList.add("add-task-btn");
        addTaskBtn.textContent = `\u2295 Add Task`;
        addTaskBtn.addEventListener("click", () => this.openAddTaskModal());

        todosContainer.appendChild(addTaskBtn);
        mainSection.append(sideBar, todosContainer);

        return mainSection;
    }

    openAddTaskModal() {
        let addTaskModal = document.querySelector(".add-task-modal");

        if (!addTaskModal) {
            addTaskModal = document.createElement("dialog");
            addTaskModal.classList.add("add-task-modal");

            const xClosetBtn = document.createElement("button");
            xClosetBtn.classList.add("x-closet-btn");
            xClosetBtn.textContent = '\u2715';
            xClosetBtn.addEventListener("click", () => addTaskModal.close());

            addTaskModal.append(this.createTaskForm(), xClosetBtn);
            this.body.appendChild(addTaskModal);
        }

        addTaskModal.showModal();
    }

    createTaskForm() {
        const taskForm = document.createElement("form");
        taskForm.classList.add("task-form");

        const taskFormHeader = document.createElement("h2");
        taskFormHeader.classList.add("task-form-header");
        taskFormHeader.textContent = "Add Task";
        taskForm.appendChild(taskFormHeader);

        const taskFormFields = [{
            label: "Title*",
            input: { tagName: "input", type: "text", name: "todo-title", id: "todo-title", required: true }
        }, {
            label: "Description",
            input: { tagName: "textarea", name: "todo-description", id: "todo-description", rows: 5 }
        }, {
            label: "Due Date",
            input: { tagName: "input", type: "date", name: "todo-dueDate", id: "todo-dueDate" }
        }, {
            label: "Priority",
            input: { tagName: "select", name: "priority-select", id: "priority-select" },
            options: [
                { value: "low", text: "Low" },
                { value: "normal", text: "Normal" },
                { value: "high", text: "High" }]
        },];

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
            this.body.querySelector(".add-task-modal").close();
        });

        const submitBtn = document.createElement("button");
        submitBtn.classList.add("submit-task-btn");
        submitBtn.textContent = "Add Task";

        taskFormBtnWrapper.append(cancelBtn, submitBtn);
        taskForm.appendChild(taskFormBtnWrapper);

        return taskForm;
    }

    renderTasks(tasks) {
        tasks.forEach((task) => {
            const taskItem = document.createElement("p");
            taskItem.textContent = ` ${task.title} ${task.dueDate}`;
            taskItem.classList.add("task-item");

            const detailBtn = document.createElement("button");
            detailBtn.classList.add("detail-btn");
            detailBtn.textContent = "Details";
            detailBtn.addEventListener("click", e => this.openTodoDetail(task));

            taskItem.appendChild(detailBtn);
            document.querySelector(".todos-container").appendChild(taskItem);
        });
    }

    openTodoDetail(task) {
        let todoDetailModal = document.querySelector(".todo-detail-modal") || this.createTodoDetailModal();

        todoDetailModal.querySelector(".todo-detail-title").textContent = task.title;
        todoDetailModal.querySelector(".todo-detail-desc").textContent = `Details: ${task.description}`;
        todoDetailModal.querySelector(".todo-detail-due").textContent = `DueDate: ${task.dueDate}`;
        todoDetailModal.querySelector(".todo-detail-priority").textContent = `Priority: ${task.priority}`;

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

        const xClosetBtn = document.createElement("button");
        xClosetBtn.classList.add("x-closet-btn");
        xClosetBtn.textContent = '\u2715';
        xClosetBtn.addEventListener("click", e => todoDetailModal.close());

        const closeDetailBtn = document.createElement("button");
        closeDetailBtn.classList.add("close-detail-btn");
        closeDetailBtn.textContent = "Close Detail";
        closeDetailBtn.addEventListener("click", e => todoDetailModal.close());

        todoDetailModal.append(todoDetailTitle, todoDetailDesc, todoDetailDue, todoDetailPriority, xClosetBtn, closeDetailBtn);
        this.body.append(todoDetailModal);

        return todoDetailModal;
    }

    renderFooter() {
        const footer = document.createElement("Footer");
        footer.classList.add("footer");
        footer.textContent = "Footer";
        return footer;
    }
}