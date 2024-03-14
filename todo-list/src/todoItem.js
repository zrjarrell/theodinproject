class todoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = "todo" + todoItem.todoCounter;
        this.completed = false;
        todoItem.todoCounter ++;
    }

    changePriority(newPriority) {
        this.priority = newPriority
    }

    markComplete() {
        this.completed = true
    }

    static todoCounter = 0;
}

export { todoItem };