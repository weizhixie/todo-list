export class Task {
    #id;
    #completed;

    constructor(title, description, dueDate, priority, completed = false, id = crypto.randomUUID()) {
        this.#id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.#completed = completed;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get completed() {
        return this.#completed;
    }

    set completed(completed) {
        this.#completed = completed;
    }

    toggleCompleted() {
        this.#completed = !this.#completed;
    }

    toObject() {
        return {
            "id": this.#id,
            "title": this.title,
            "description": this.description,
            "dueDate": this.dueDate,
            "priority": this.priority,
            "completed": this.#completed,
        };
    }
}