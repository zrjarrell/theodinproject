import './style.css';
import { makeHomepage } from './home';
import { makeMenu } from './menu';
import { makeAbout } from './about';

const contentDiv = document.getElementById("content");

makeHomepage(contentDiv);

const buttons = document.querySelectorAll("button");

for (let button of buttons) {
    button.addEventListener('click', function() {
        contentDiv.innerHTML = ""
        if (this.value == "home") {
            makeHomepage(contentDiv);
        } else if (this.value == "menu") {
            makeMenu(contentDiv);
        } else if (this.value == "about") {
            makeAbout(contentDiv);
        };
    });
};
