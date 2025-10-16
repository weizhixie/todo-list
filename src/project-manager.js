export class ProjectManager {
    #projects;

    constructor() {
        this.#projects = [];
    }

    create(project) {
        this.#projects.push(project);
        return project;
    }

    update(projectID, newName) {
        this.#projects = this.#projects.map((project) => {
            if (project.id === projectID) {
                project.name = newName;
            }
            return project;
        });
    }

    delete(projectID) {
        const projectIndex = this.#projects.findIndex(project => project.id === projectID);

        if (projectIndex !== -1) {
            this.#projects.splice(projectIndex, 1);
        }
    }

    listByProject(projectID) {
        return this.#projects.find(project => project.id === projectID);
    }

    listAll() {
        return this.#projects;
    }

    findProjectOfTask(taskID) {
        return this.#projects.find(project => project.tasks.some(list => list.id === taskID));
    }
}