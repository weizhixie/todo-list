export class Task {
    #id;

    constructor(title, description, dueDate, priority) {
        this.#id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get id() {
        return this.#id;
    }
}