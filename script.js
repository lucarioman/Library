let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    info()  {
        if (read == true) {
        return this.title + ' by ' + this.author + ', ' + this.pages + ', have read';
        }
        return this.title + ' by ' + this.author + ', ' + this.pages + ', not read yet';
    }

    updateRead() {
        if (this.read == true) {
            this.read = false;
        }
        else {
            this.read = true;
        }
    }

    equal(book) {
        if (this.title == book.title && this.author == book.author) {
            return true;
        }
        return false;
    }

    cardvalue() {
        const newCard = document.createElement("div");
        newCard.className = "book-card";
        newCard.id = this.id;
        newCard.textContent = title;
        const cardAuthorContent = document.createElement("div");
        cardAuthorContent.className = "book-content";
        cardAuthorContent.textContent = "by: " + this.author;
        const cardPageContent = document.createElement("div");
        cardPageContent.className = "book-content";
        cardPageContent.textContent = "Pages: " + this.pages;
        const cardReadContent = document.createElement("div");
        cardReadContent.className = "book-content";
        cardReadContent.textContent = "Read: " + (this.read ? "Yes" : "No");

        const flipBtn = document.createElement("button");
        flipBtn.textContent = "Flip Read?";
        flipBtn.className = this.id;
        flipBtn.addEventListener("click", function() {
            const id = flipBtn.className;
            updateCardsWithFlip(id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete?";
        deleteBtn.className = this.id;
        deleteBtn.addEventListener("click", function() {
            const id = deleteBtn.className;
            updateCardsWithRemove(id);
            updateCards();
        });

        newCard.appendChild(cardAuthorContent);
        newCard.appendChild(cardPageContent);
        newCard.appendChild(cardReadContent);
        newCard.appendChild(flipBtn);
        newCard.appendChild(deleteBtn);

        return newCard;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.concat(book);
    console.log("Have Added the Book: " + book.title + " to the Library Successfully");
}

const form = document.getElementById('bookForm');

form.addEventListener('submit', function(event) {
    const title = form.elements['title'].value.trim();
    const author = form.elements['author'].value.trim();
    const pages = form.elements['pages'].value.trim();
    const read = form.elements['read'].value == "on";
    const tempBook = new Book(title, author, pages, read);
    let check = true;
    for (let index = 0; index < myLibrary.length; index++) {
        if (myLibrary[index].equal(tempBook)) {
            check = false;
            alert("Have already added this book! Please try again!");
        }
    }
    if (check) {
        myLibrary.push(tempBook);
        alert("Successfully Add the Book: " + tempBook.info());
        updateCards();
    }
    event.preventDefault();
});

const content = document.getElementsByClassName('content');

function updateCards() {
    const cards = content[0].querySelectorAll('.book-card');
    cards.forEach(card => card.remove());
    for (let index = 0; index < myLibrary.length; index++) {
        const element = myLibrary[index];
        content[0].appendChild(element.cardvalue());
    }
}

function updateCardsWithFlip(id) {
    const cards = content[0].querySelectorAll('.book-card');
    cards.forEach(card => card.remove());
    for (let index = 0; index < myLibrary.length; index++) {
        if (myLibrary[index].id == id) {
            myLibrary[index].updateRead();
        }
        const element = myLibrary[index];
        content[0].appendChild(element.cardvalue());
    }
}

function updateCardsWithRemove(id) {
    let tempLibrary = [];
    for (let index = 0; index < myLibrary.length; index++) {
        if (myLibrary[index].id != id) {
            tempLibrary.push(myLibrary[index]);
        }
    }
    myLibrary = tempLibrary;
}
