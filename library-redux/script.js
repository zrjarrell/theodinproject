let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${!this.read ? 'not ' : ''}read.`;
    }
}

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;

//     this.info = function(){
//         return `${this.title} by ${this.author}, ${this.pages} pages, ${!this.read ? 'not ' : ''}read.`;
//     }
// }

function addBookToLibrary(title, author, pages, read) {
    let newAddition = new Book(title, author, pages, read);
    myLibrary.push(newAddition);
}

var table = document.getElementById("library");

function showLibrary() {
    for (i in myLibrary) {
        var newRow = table.insertRow();
        newRow.classList.add("dataRow")
        newRow.insertCell(0).innerHTML = myLibrary[i].title;
        newRow.insertCell(1).innerHTML = myLibrary[i].author;
        newRow.insertCell(2).innerHTML = myLibrary[i].pages;
        addReadStatus(newRow, i, myLibrary[i].read);
        //newRow.insertCell(3).innerHTML = myLibrary[i].read;
        addRemoveButton(newRow, i)
    };
};

function refreshLibraryDisplay() {
    oldData = table.querySelectorAll(".dataRow");
    for (i of oldData) {i.remove()};
    showLibrary();
};

function addBookToDisplay() {
    book = myLibrary.slice(-1)[0];
    var newRow = table.insertRow();
    newRow.classList.add("dataRow")
    newRow.insertCell(0).innerHTML = book.title;
    newRow.insertCell(1).innerHTML = book.author;
    newRow.insertCell(2).innerHTML = book.pages;
    addReadStatus(newRow, myLibrary.length-1, book.read);
    //newRow.insertCell(3).innerHTML = book.read;
    addRemoveButton(newRow, myLibrary.length-1)
};

function addRemoveButton(newRow, buttonValue) {
    var removeButton = document.createElement("button");
    removeButton.appendChild(document.createTextNode("Remove"));
    removeButton.value = buttonValue;
    removeButton.classList.add("removeButton");
    newRow.insertCell(4).appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        myLibrary.splice(removeButton.value, 1);
        refreshLibraryDisplay();
    });
};

function addReadStatus(newRow, objectIndex, readState) {
    var readCell = document.createElement("td");
    readCell.appendChild(document.createTextNode(readState));
    readCell.value = objectIndex;
    newRow.insertCell(3).appendChild(readCell);
    readCell.addEventListener('click', () => {
        if (readCell.textContent == "false") {
            myLibrary[objectIndex].read = true;
        } else {
            myLibrary[objectIndex].read = false;
        };
        refreshLibraryDisplay();
    });
};

const addBook_btn = document.querySelector("#addBook");

const bookForm = document.getElementById("addBookForm");

addBook_btn.addEventListener('click', () => {
    if (document.getElementById("addBookForm").style.display == "block") {
        document.getElementById("addBookForm").style.display = "none";
    } else {
        document.getElementById("addBookForm").style.display = "block";
    }
});

bookForm.addEventListener('submit', (e) => {
    inputs = document.getElementById("addBookForm").elements;
    addBookToLibrary(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked);
    bookForm.reset();
    bookForm.style.display = "none";
    addBookToDisplay();
    e.preventDefault();
});