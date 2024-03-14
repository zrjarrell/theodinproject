class Project {
    constructor(name) {
        this.name = name;
        this.id = "project" + Project.projectCounter
        this.todos = []
        Project.projectCounter ++;
    }
    
    static projectCounter = 0
}

export {Project}