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
        todosContainer.textContent = "Todos container";

        mainSection.append(sideBar, todosContainer);
        return mainSection;
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