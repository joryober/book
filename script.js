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
    let container = document.querySelector(".container");
    let libraryDiv = document.querySelector('.lib');
    container.removeChild(libraryDiv);
    libraryDiv = document.createElement('div');
    libraryDiv.classList.add("lib")
    container.appendChild(libraryDiv);

    // container.appendChild(libraryDiv);
    // container.removeChild(libraryDiv);
    // container.appendChild(libraryDiv);
    
    myLibrary.forEach(book => {
        let bookDiv = document.createElement('div')
        for (let[key, value] of Object.entries(book)){
            if (key == "info") break;
            let bookElement = document.createElement('h4');
            bookElement.textContent = `${key}: ${value}`.toUpperCase();
            bookDiv.appendChild(bookElement);

            if (key == "read") {
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "remove";
            removeBtn.classList.add("remove")
            bookDiv.appendChild(removeBtn);
            
            }
        }
        bookDiv.style.cssText = "margin: 10px; border: thick solid #0000FF";
        bookDiv.classList.add("book");
        libraryDiv.appendChild(bookDiv);
    })

    // go through remove buttons, add functionality
    let removeBtns = document.querySelectorAll(".remove");
    // removeBtns.forEach(btn => {
    //     btn.addEventListener("click", () => {
    //         console.log(btn.parentNode.textContent);
    //         btn.parentNode.parentNode.removeChild(btn.parentNode);
    //     })
    // })
    for(let i=0; i<removeBtns.length; i++){
        removeBtns[i].addEventListener("click", () => {
            removeBtns[i].parentNode.parentNode.removeChild(removeBtns[i].parentNode);
            for (let j=0; j<myLibrary.length; j++){
                myLibrary[j]["index"] = j;
            }
            
            
            myLibrary = (myLibrary.filter(book => {
                return book["index"] !== i;
            }))
            console.log("remove:");
            console.log(myLibrary);
            for (let j=0; j<myLibrary.length; j++){
                myLibrary[j]["index"] = j;
            }
            
        })

    }
    
    
    
}

let newBookBtn = document.querySelector(".new-book");
newBookBtn.addEventListener("click", () => {

    addBookToLibrary();
    //give all books indicies
    for (let i=0; i<myLibrary.length; i++){
        myLibrary[i]["index"] = i;
    }
    let removeBtns = document.querySelectorAll(".remove");
    for(let i=0; i<removeBtns.length; i++){
        removeBtns[i].addEventListener("click", () => {
            removeBtns[i].parentNode.parentNode.removeChild(removeBtns[i].parentNode);
            for (let j=0; j<myLibrary.length; j++){
                myLibrary[j]["index"] = j;
            }
            myLibrary = myLibrary.filter(book => {
                book["index"] != i;
            })
            for (let j=0; j<myLibrary.length; j++){
                myLibrary[j]["index"] = j;
            }
        })
    }
    render();  
    console.log("add:");
    console.log(myLibrary);
});

