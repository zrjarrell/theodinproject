import { createTextedElement } from "./utilities";

function makeHomepage(container) {

    const header = createTextedElement("h2", "Krusty Burger");

    const intro = createTextedElement("div", "Welcome to Krusty Burger, home of the Official Meat-Flavored Sandwich of the 1984 Summer Olympic Games! Here, you're profit, so go ahead and strap on a feedbag. Try the new Hanoi Honey Barbecue Banh Mi Pho_Furter while it lasts!");

    const hoursDiv = document.createElement("div");
    const hoursHeader = createTextedElement("h3", "Hours");
    hoursDiv.appendChild(hoursHeader);

    const hours = document.createElement("ul");

    const hoursList = ["Sunday: 6am - 10pm", "Monday: 6am - 10pm", "Tuesday: 6am - 10pm", "Wednesday: 6am - 10pm", "Thursday: 6am - 10pm", "Friday: 6am - 11pm", "Saturday: 6am - 11pm"]
    for (let i = 0; i < hoursList.length; i++) {
        const hour = createTextedElement("li", hoursList[i]);
        hours.appendChild(hour);
    };
    hoursDiv.appendChild(hours);


    const locationDiv = document.createElement("div");

    const locationHeader = createTextedElement("h3", "Location");
    locationDiv.appendChild(locationHeader);

    const locationPara = createTextedElement("p", "We're everywhere!! You can't get away from us.");
    locationDiv.appendChild(locationPara);

    container.appendChild(header);
    container.appendChild(intro);
    container.appendChild(hoursDiv);
    container.appendChild(locationDiv);
}

export {makeHomepage}