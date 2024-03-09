import { createTextedElement } from "./utilities";

function makeAbout(container) {

    const aboutHeader = createTextedElement("h2", "About Us");

    const about = createTextedElement("div", "Krusty Burger is the one-stop shop for all foods Krusty. Your favorite clown is committed to giving you a family dining experience like none other. So come on down, strap on a feedbag and share in the krust. Remember, when you're here, you're profit.");

    container.appendChild(aboutHeader);
    container.appendChild(about);

    const contactHeader = createTextedElement("h2", "Contact Us");

    const contactCard = document.createElement("div");
    
    const questions = createTextedElement("p", "Questions: 555-555-1234");
    const promotions = createTextedElement("p", "Promotions: 555-555-2468");
    const complaints = createTextedElement("p", "Complaints: 555-555-5555");
    const franchise = createTextedElement("p", "Franchising: 555-555-4321");

    contactCard.appendChild(questions);
    contactCard.appendChild(promotions);
    contactCard.appendChild(complaints);
    contactCard.appendChild(franchise);

    container.appendChild(contactHeader);
    container.appendChild(contactCard);
}

export {makeAbout}