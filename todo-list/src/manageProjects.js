import { Project } from "./project";
import { createTextedElement } from "./utilities";
import { populateProject } from "./populateProject";

function makeNewProjectForm() {
    const newProjectForm = document.createElement("div");
    newProjectForm.id = "newProjectForm";

    const newProjectLabel = createTextedElement("label", "New Project:");
    const newProjectInput = document.createElement("input");
    const newProjectSubmit = createTextedElement("button", "Submit");
    newProjectInput.id = "newProjectName";
    newProjectSubmit.id = "newProjectSubmit";

    newProjectForm.appendChild(newProjectLabel);
    newProjectForm.appendChild(newProjectInput);
    newProjectForm.appendChild(newProjectSubmit);

    return newProjectForm
}

function manageProjects(projects, current, projectContainer, todoContainer) {
    projectContainer.innerHTML = ""

    for (let project of projects) {
        const projectDiv = createTextedElement("div", project.name);
        projectDiv.classList.add("projectDiv");
        projectDiv.id = project.id;
        projectContainer.appendChild(projectDiv);
    }

    projectContainer.appendChild(makeNewProjectForm());

    populateProject(todoContainer, projects, current);

    const projectDivs = document.getElementsByClassName("projectDiv");

    for (let projectDiv of projectDivs) {
        projectDiv.addEventListener('click', function() {
            for (let i = 0; i < projectDivs.length; i++) {
                if (this.id == projects[i].id) {
                    current = i;
                    console.log(current)
                }
            }
            manageProjects(projects, current, projectContainer, todoContainer)
        })
    }

    const newProjectSubmit = document.getElementById("newProjectSubmit");

    newProjectSubmit.addEventListener('click', function() {
        const newProjectInput = document.getElementById("newProjectName");
        projects.push(new Project(newProjectInput.value))
        current = projects.length - 1;
        manageProjects(projects, current, projectContainer, todoContainer);
    })
}

export {manageProjects}