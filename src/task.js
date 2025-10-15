export class Task {
    #id;
    #completed;

    constructor(title, description, dueDate, priority) {
        this.#id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.#completed = false;
    }

    get id() {
        return this.#id;
    }

    get completed() {
        return this.#completed;
    }

    toggleCompleted() {
        this.#completed = !this.#completed;
    }
}