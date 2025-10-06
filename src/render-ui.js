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

    renderFooter() {
        const footer = document.createElement("Footer");
        footer.classList.add("footer");
        footer.textContent = "Footer";
        return footer;
    }
}