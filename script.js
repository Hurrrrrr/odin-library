"use strict";

let myLibrary = [];
let bookHeaders = ["Title", "Author", "Pages", "Read?", "", ""];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (read == "true") {
        this.read = true;
    } else {
        this.read = false;
    }
}

// Create a new book and display it
function buttonClick() {
    addBook();
    removeTable();
    displayBooks();
}

// Get user input for new book and add new book to myLibrary array
function addBook() {
    let title = prompt("Title:");
    let author = prompt("Author:");
    let pages = prompt("Pages:");
    let read = prompt("Read?");

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Display all books in library
function displayBooks() {
    const main = document.querySelector("#main");

    let table = document.createElement("table");
    table.setAttribute("id", "myTable");

    // Create header row of table
    let headerRow = document.createElement("tr");
    if (myLibrary.length > 0) {
        bookHeaders.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        })
    }
    table.appendChild(headerRow);

    // Create non-header rows
    myLibrary.forEach(obj => {
        let row = document.createElement("tr");

        // Create each row of text cells
        Object.values(obj).forEach(text => {
            let cell = document.createElement("td");
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })

        // Create delete book button
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete-button");
        deleteButton.innerHTML = "Delete book";
        deleteButton.addEventListener("click", () => deleteBook(obj));
        row.appendChild(deleteButton);

        // Create read/unread toggle button
        let toggleButton = document.createElement("button");
        toggleButton.setAttribute("class", "toggle-button");
        toggleButton.innerHTML = "Read/unread";
        toggleButton.addEventListener("click", () => readToggle(obj));
        row.appendChild(toggleButton);

        table.appendChild(row);
    })
    main.appendChild(table);
}

function removeTable() {
    if (document.contains(document.getElementById("myTable"))) {
        document.getElementById("myTable").remove();
    }
}

function deleteBook(obj) {
    myLibrary.splice(myLibrary.indexOf(obj), 1);
    removeTable();
    displayBooks();
}

function readToggle(obj) {
    myLibrary[myLibrary.indexOf(obj)]["read"] = !myLibrary[myLibrary.indexOf(obj)]["read"]
    removeTable();
    displayBooks();
}