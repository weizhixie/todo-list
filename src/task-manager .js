export class TaskManager {
    #tasks;

    constructor() {
        this.#tasks = [];
    }

    create(task) {
        this.#tasks.push(task);
        return task;
    }

    update(taskId, newValue) {
        this.#tasks = this.#tasks.map((task) => {
            if (task.id === taskId) {
                Object.keys(newValue).forEach(key => {
                    if (task.hasOwnProperty(key)) {
                        task[key] = newValue[key];
                    }
                });
            }
            return task;
        });
    }

    delete(taskId) {
        const taskIndex = this.#tasks.findIndex(task => task.id === taskId);

        if (taskIndex !== -1) {
            this.#tasks.splice(taskIndex, 1);
        }
    }

    listAll() {
        return this.#tasks;
    }

    listTasksDueToday() {
        const today = new Date().toISOString().split("T")[0];
        return this.#tasks.filter(task => task.dueDate === today);
    }

    listTasksUpcoming() {
        const today = new Date().toISOString().split("T")[0];
        return this.#tasks.filter(task => task.dueDate > today);
    }

    listTasksCompleted() {
        return this.#tasks.filter(task => task.completed === true);
    }

    toggleCompleted(taskId) {
        this.#tasks.find(task => task.id === taskId).toggleCompleted();
    }
}