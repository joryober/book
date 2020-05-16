let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    let readStatus = read ? "read" : "not read yet";

    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${readStatus}`
    }
}

let addBookToLibrary = () => {
    let title = prompt('Title of book?');
    let author = prompt('Author of book?');
    let pages = prompt('Number of pages?');
    let read = (prompt('Have you read this book? Yes/No')).toLowerCase();

    while([title, author, pages, read].some(val => !val)){
        alert("One or more values were not inputted. Please try again.");
        title = prompt('Title of book?');
        author = prompt('Author of book?');
        pages = prompt('Number of pages?');
        read = (prompt('Have you read this book? Yes/No')).toLowerCase();
    }

    while(!['yes', 'y', 'no', 'n'].includes(read)){
        alert("Invalid answer. Please input yes or no.")
        read = (prompt('Have you read this book? Yes/No')).toLowerCase();
    }

    let readStatus;

    if (['yes', 'y'].includes(read)){
        readStatus = true;
    } else if (['no', 'n'].includes(read)){
        readStatus = false;
    } 

    

    myLibrary.push(new Book(title, author, pages, readStatus));

}

let render = () => {
    let libraryDiv = document.querySelector('.lib');
    myLibrary.forEach(book => {
        let container = document.querySelector(".container");
        let bookDiv = document.createElement('div')
        for (let[key, value] of Object.entries(book)){
            if (key == "info") break;
            let bookElement = document.createElement('h4');
            bookElement.textContent = `${key}: ${value}`.toUpperCase();
            bookDiv.appendChild(bookElement);
        }
        bookDiv.style.cssText = "margin: 10px; border: thick solid #0000FF"
        libraryDiv.appendChild(bookDiv);
    })
    
}

let newBookBtn = document.querySelector(".new-book");
newBookBtn.addEventListener("click", () => {
    addBookToLibrary();
    render();
});

