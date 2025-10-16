export class Project {
    #id;
    #tasks;

    constructor(name) {
        this.#id = crypto.randomUUID();
        this.name = name;
        this.#tasks = [];
    }

    get id() {
        return this.#id;
    }

    get tasks() {
        return this.#tasks;
    }

    addTask(task) {
        this.#tasks.push(task);
    }
}