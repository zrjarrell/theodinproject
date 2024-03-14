import { createTextedElement } from "./utilities";
import { makeEditForm } from "./todoEdit";
import { addNewTodoForm } from './newTodo.js';
import { Project } from "./project.js";
import { todoItem } from "./todoItem.js";

function buildTodoCard (todo) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todoCard");
    todoCard.id = todo.id;

    const titleRow = document.createElement("div");
    titleRow.classList.add("titleRow");

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("mainDiv");
    const titleP = createTextedElement("p", todo.title);
    const dueP = createTextedElement("p", todo.dueDate);
    mainDiv.appendChild(titleP);
    mainDiv.appendChild(dueP);

    const completeButton = createTextedElement("button", "Complete")
    completeButton.classList.add("completeButton");
    completeButton.value = todo.id;
    if (todo.completed) {completeButton.disabled = true}

    titleRow.appendChild(mainDiv)
    titleRow.appendChild(completeButton);

    const expandDiv = document.createElement("div");
    expandDiv.classList.add("expandDiv");

    const descriptionRow = createTextedElement("p", todo.description);
    descriptionRow.classList.add("descriptionRow");

    const editForm = makeEditForm(todo);

    expandDiv.appendChild(descriptionRow);
    expandDiv.appendChild(editForm);

    todoCard.appendChild(titleRow);
    todoCard.appendChild(expandDiv);

    return todoCard
}

function populateProject (container, projects, current) {
    container.innerHTML = "";
    let project = projects[current].todos;

    for (let todo of project) {
        const todoDiv = buildTodoCard(todo);
        if (todo.priority < 4) {
            todoDiv.firstChild.firstChild.classList.add("prioritized")
            todoDiv.style.color = "red"
        }
        if (todo.completed) {
            todoDiv.firstChild.firstChild.classList.add("completed")
            todoDiv.style.color = "gray"
        }
        container.appendChild(todoDiv);
    }

    addNewTodoForm(container, projects, current)

    const completeButtons = document.getElementsByClassName("completeButton")

    for (let btn of completeButtons) {
        btn.addEventListener('click', function() {
            for (let todo of project) {
                if (todo.id == btn.value) {
                    todo.completed = true;
                }
            }
            populateProject(container, projects, current)
        })
    }

    const editButtons = document.getElementsByClassName("updateButton");

    for (let btn of editButtons) {
        btn.addEventListener('click', function() {
            const newValues = document.getElementById(btn.value).getElementsByTagName("input");
            for (let todo of project) {
                if (todo.id == btn.value) {
                    todo.title = newValues[0].value
                    todo.dueDate = newValues[1].value
                    todo.description = newValues[2].value
                }
            }
            populateProject (container, projects, current)
        });
    }

    const deleteButtons = document.getElementsByClassName("deleteButton");

    for (let btn of deleteButtons) {
        btn.addEventListener('click', function() {
            console.log(btn.value)
            for (let i = 0; i < project.length; i ++) {
                console.log(i)
                if (project[i].id == btn.value) {
                    project.splice(i, 1);
                    console.log(project)
                }
            }
            populateProject(container, projects, current)
        })
    }

    const todoDivs = document.querySelectorAll(".titleRow");

    for (let todoDiv of todoDivs) {
        todoDiv.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === 'flex') {
                content.style.display = 'none'
            } else {
                content.style.display = 'flex'
            }
        });
    }

    localStorage.setItem("allTodoProjects", JSON.stringify(projects))
    localStorage.setItem("projectCounter", Project.projectCounter)
    localStorage.setItem("todoCounter", todoItem.todoCounter)
}



export { populateProject };