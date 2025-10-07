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

            taskItem.appendChild(detailBtn);
            document.querySelector(".todos-container").appendChild(taskItem);
        });
    }

    renderFooter() {
        const footer = document.createElement("Footer");
        footer.classList.add("footer");
        footer.textContent = "Footer";
        return footer;
    }
}