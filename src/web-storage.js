export class WebStorage {
    storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            );
        }
    }

    save(taskManager, projectManager) {
        if (this.storageAvailable("localStorage")) {
            const data = {
                tasks: taskManager.listAll().map(task => ({
                    ...task.toObject(),
                    projectName: projectManager.findProjectOfTask(task.id).name
                })),
                projects: projectManager.listAll()
            };
            localStorage.setItem("todoData", JSON.stringify(data));
        }
    }

    load() {
        const data = JSON.parse(localStorage.getItem("todoData"));
        return data;
    }
}