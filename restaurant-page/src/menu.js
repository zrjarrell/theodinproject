import { createTextedElement } from "./utilities";

function makeMenuCard(name, price, description) {
    const card = document.createElement("div")
    card.classList.add("menuCard");
    
    const title = document.createElement("div");
    const itemName = createTextedElement("p", name);
    const itemPrice = createTextedElement("p", price);
    title.appendChild(itemName);
    title.appendChild(itemPrice);

    const itemDescription = createTextedElement("div", description);
    card.appendChild(title);
    card.appendChild(itemDescription);

    return card
}

function makeMenu(container) {

    const drinkHeader = createTextedElement("h2", "Drinks");

    const drink1 = makeMenuCard("Krusty Orange Drink", "$2.00", "It's orange. That's all we promise.");

    container.appendChild(drinkHeader);
    container.appendChild(drink1);

    const entreeHeader = createTextedElement("h2", "Entrees");

    const entree1 = makeMenuCard("Krusty Burger", "$5.00", "It's what you came here for, one meat-flavored patty on medical grade buns.");
    const entree2 = makeMenuCard("Ribwich", "$6.00", "So good you might as well order two.");
    const entree3 = makeMenuCard("Hanoi Honey Barbecue Banh Mi Pho_Furter", "$8.00", "Discontinued.");

    container.appendChild(entreeHeader);
    container.appendChild(entree1);
    container.appendChild(entree2);
    container.appendChild(entree3);

    const dessertHeader = createTextedElement("h2", "Desserts");

    const dessert1 = makeMenuCard("Krusty Shake", "$4.00", "Now with extra krust!");
    const dessert2 = makeMenuCard("Bucket of Flan", "$7.00", "XXLupgrade to the Trucket of Flan for $98.00.");

    container.appendChild(dessertHeader);
    container.appendChild(dessert1);
    container.appendChild(dessert2);
}

export {makeMenu}