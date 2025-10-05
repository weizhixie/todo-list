export class ProjectManager {
    #projects;

    constructor() {
        this.#projects = [];
    }

    create(project) {
        this.#projects.push(project);
        return project;
    }

    update(projectId, newName) {
        this.#projects = this.#projects.map((project) => {
            if (project.id === projectId) {
                project.name = newName;
            }
            return project;
        });
    }

    delete(projectId) {
        const projectIndex = this.#projects.findIndex(project => project.id === projectId);

        if (projectIndex !== -1) {
            this.#projects.splice(projectIndex, 1);
        }
    }

    listByProject(projectId) {
        return this.#projects.find(project => project.id === projectId);
    }

    listAll() {
        return this.#projects;
    }
}