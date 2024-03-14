import './style.css';
import { Project } from './project.js'
import { todoItem } from './todoItem.js';
import { manageProjects } from './manageProjects.js';
import { storageAvailable } from './localStorage.js';

const projectContainer = document.getElementById("projectPanel");
const todoContainer = document.getElementById("todoPanel");

let allProjects;

if (storageAvailable("localStorage") && localStorage.getItem("allTodoProjects") !== null) {
    console.log("opt1")
    allProjects = JSON.parse(localStorage.getItem("allTodoProjects"));
    Project.projectCounter = Number(localStorage.getItem("projectCounter"));
    todoItem.todoCounter = Number(localStorage.getItem("todoCounter"));
} else {
    console.log("opt3")
    allProjects = [new Project("My Todo List")];
}

let currentProject = 0;

manageProjects(allProjects, currentProject, projectContainer, todoContainer);

//Add memory