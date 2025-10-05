export function renderUI() {
    const home = document.querySelector("body");
    home.append(renderHeader(), renderMainSection(), renderFooter());
}

function renderHeader() {
    const header = document.createElement("header");
    header.classList.add("header")
    header.textContent = `Header`;

    return header;
}

function renderMainSection() {
    const mainSection = document.createElement("main");
    mainSection.classList.add("main-section");

    const sideBar = document.createElement("aside");
    sideBar.classList.add("side-bar")
    sideBar.textContent = `Side bar`;

    const todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-list-container")
    todoListContainer.textContent = "Todo list container";

    mainSection.append(sideBar, todoListContainer)
    return mainSection;
}

function renderFooter() {
    const footer = document.createElement("Footer");
    footer.classList.add("footer")
    footer.textContent = "Footer";

    return footer;
}