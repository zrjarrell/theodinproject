class todoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    changePriority(newPriority) {
        this.priority = newPriority
    }

    markComplete() {
        this.completed = true
    }
}

export { todoItem }