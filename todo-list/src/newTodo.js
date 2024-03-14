import { createTextedElement } from "./utilities";
import { todoItem } from "./todoItem";
import { populateProject } from "./populateProject";

function makeNewTodoForm() {
    const newTodoForm = document.createElement("div")
    newTodoForm.id = "newTodoForm";

    const todoDiv = document.createElement("div")
    const todoLabel = createTextedElement("label", "Name:");
    const todoInput = document.createElement("input");
    todoDiv.appendChild(todoLabel);
    todoDiv.appendChild(todoInput);

    const dueDiv = document.createElement("div");
    const dueLabel = createTextedElement("label", "Due:");
    const dueInput = document.createElement("input");
    dueDiv.appendChild(dueLabel);
    dueDiv.appendChild(dueInput);

    const descriptionDiv = document.createElement("div");
    const descriptionLabel = createTextedElement("label", "Description:");
    const descriptionInput = document.createElement("input");
    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(descriptionInput);

    const priorityDiv = document.createElement("div");
    const priorityLabel = createTextedElement("label", "Priority:");
    const priorityInput = document.createElement("input");
    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(priorityInput);

    const submitButton = createTextedElement("button", "Add Todo");
    submitButton.id = "newTodoSubmit";

    newTodoForm.appendChild(todoDiv);
    newTodoForm.appendChild(dueDiv);
    newTodoForm.appendChild(descriptionDiv);
    newTodoForm.appendChild(priorityDiv);
    newTodoForm.appendChild(submitButton);

    return newTodoForm
}

function addNewTodoForm(container, projects, current) {
    const todoForm = makeNewTodoForm();
    container.appendChild(todoForm);
    let project = projects[current].todos;
    
    const todoFormInputs = todoForm.getElementsByTagName("input");
    const submitButton = document.getElementById("newTodoSubmit");
    submitButton.addEventListener('click', function() {
        const newTodo = new todoItem(todoFormInputs[0].value,
            todoFormInputs[1].value,
            todoFormInputs[2].value,
            todoFormInputs[3].value)
        project.push(newTodo)
        populateProject(container, projects, current)
    })
}

export {addNewTodoForm}