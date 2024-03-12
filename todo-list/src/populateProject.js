import { createTextedElement } from "./utilities";

function buildTodoCard (todo) {
    const todoCard = document.createElement("div");

    const topRow = document.createElement("div");

    const titleDiv = createTextedElement("p", todo.title);
    const dueDiv = createTextedElement("p", todo.dueDate);
    topRow.appendChild(titleDiv);
    topRow.appendChild(dueDiv);

    const descriptionRow = createTextedElement("p", todo.description);
    todoCard.appendChild(topRow);
    todoCard.appendChild(descriptionRow);

    return todoCard
}

function populateProject (container, project) {
    container.innerHTML = "";
    for (let todo of project) {
        const todoDiv = buildTodoCard(todo);
        container.appendChild(todoDiv);
    }
}

export { populateProject }