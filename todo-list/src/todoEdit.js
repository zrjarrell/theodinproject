import { createTextedElement } from "./utilities.js";

function makeEditForm (todo) {
    const editForm = document.createElement("div");
    editForm.id = todo.id;
    editForm.classList.add("todoEdit")

    const nameLabel = createTextedElement("label", "Name:");
    const nameInput = document.createElement("input");
    nameInput.defaultValue = todo.title;
    editForm.appendChild(nameLabel);
    editForm.appendChild(nameInput);

    const dueLabel = createTextedElement("label", "Due Date:");
    const dueInput = document.createElement("input");
    dueInput.defaultValue = todo.dueDate
    editForm.appendChild(dueLabel);
    editForm.appendChild(dueInput);

    const descriptionLabel = createTextedElement("label", "Description:");
    const descriptionInput = document.createElement("input");
    descriptionInput.defaultValue = todo.description
    editForm.appendChild(descriptionLabel);
    editForm.appendChild(descriptionInput);

    const submitButton = createTextedElement("button", "Update");
    submitButton.value = todo.id;
    submitButton.classList.add("updateButton")
    editForm.appendChild(submitButton);

    const deleteButton = createTextedElement("button", "Delete");
    deleteButton.value = todo.id;
    deleteButton.classList.add("deleteButton");
    editForm.appendChild(deleteButton);

    return editForm
}

export {makeEditForm}