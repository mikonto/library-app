let myLibrary = [
  {
    title: "A Game of Thrones",
    author: "George R. R. Martin",
    pages: 694,
    read: false,
    rating: 2
  },

  {
    title: "Iijoki",
    author: "Kalle Päätalo",
    pages: 350,
    read: false,
    rating: 3
  },

  {
    title: "Hitchhikers Guide to the Galaxy",
    author: "Douglas Adams",
    pages: 200,
    read: true,
    rating: 5
  },

  {
    title: "Kalevala",
    author: "Elias Lönnrot",
    pages: 500,
    read: false,
    rating: 4
  },

];

function Book(title, author, pages, read, rating) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.rating = rating;
}

// User interface
const booksGrid = document.getElementById('books-grid');

const updateBooksGrid = () => {
  resetBooksGrid()
  for (var id = 0, l = myLibrary.length; id < l; id++) {
    createBookCard(id)
  }
}

const resetBooksGrid = () => {
  booksGrid.innerHTML = ''
}

const createBookCard = (id) => {
    const book = document.createElement("div");
    const bookRemove = document.createElement("div");
    const bookInfo = document.createElement("div");
    const bookTitle = document.createElement("h2");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("p");
    const bookRating = document.createElement("div");

    book.classList.add("book");
    bookRemove.classList.add("book-remove");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookPages.classList.add("book-pages");
    bookRead.classList.add("book-read");
    bookRating.classList.add("book-rating");

    bookRemove.setAttribute("onclick",`confirmRemove(${id});`);
    bookTitle.innerText = myLibrary[id].title;
    bookAuthor.innerText = myLibrary[id].author;
    bookPages.innerText = "Pages: " + myLibrary[id].pages;
    bookRead.innerText = getReadValue(id);
    bookRating.innerText = getRatingValue(id);

    booksGrid.appendChild(book);
    book.appendChild(bookRemove);
    book.appendChild(bookInfo);
    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookPages);
    bookInfo.appendChild(bookRead);
    book.appendChild(bookRating);
}

let getReadValue = (id) => {
  if (myLibrary[id].read === true) {return "Read: Yes"}
  if (myLibrary[id].read === false) {return "Read: No"}
}

let getRatingValue = (id) => {
  if (myLibrary[id].rating === 5) {return "★★★★★ "}
  if (myLibrary[id].rating === 4) {return "★★★★ "}
  if (myLibrary[id].rating === 3) {return "★★★ "}
  if (myLibrary[id].rating === 2) {return "★★ "}
  if (myLibrary[id].rating === 1) {return "★ "}
}



function confirmRemove(id) {
  toggleModal("confirm-container");

  const confirmText = document.getElementById("confirm-text")
  const confirmYes = document.getElementById("confirm-yes")
  const confirmNo = document.getElementById("confirm-no")

  confirmText.innerText = "Remove " + myLibrary[id].title + "?"
  confirmYes.setAttribute("onclick",`removeBook(${id}); toggleModal("confirm-container");`);
  confirmNo.setAttribute("onclick",`toggleModal("confirm-container");`);
}

function removeBook(id) {
  myLibrary.splice(id,1);
  updateBooksGrid();
}

function toggleModal(id) {
  const element = document.getElementById(id)
  element.classList.toggle("hidden");
}

document.addEventListener('DOMContentLoaded', () => {
  updateBooksGrid();
});

document.getElementById("add-book").addEventListener("click", function () {toggleModal("modal-container")});

document.getElementById("submit").addEventListener("click", function () {addBookToLibrary()});

function addBookToLibrary () {
  const title = document.forms["new-book"]["title"].value;
  const author = document.forms["new-book"]["author"].value;
  const pages = document.forms["new-book"]["pages"].value
  const read = document.forms["new-book"]["read"].checked
  const rating = Number(document.forms["new-book"]["rate"].value);
  const newBook = new Book(title, author, pages, read, rating);
  myLibrary.push(newBook);
  updateBooksGrid();
  toggleModal("modal-container");
  clearForm();
}

function clearForm() {
  document.getElementById("modal-form").reset();

}

