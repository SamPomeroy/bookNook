//openLibraryAPI url = "https://openlibrary.org/search.json"

//search API & return first sentence (maybe add author and isbn)
async function fetchBookInfo(title) {
    
    const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
    const bookInfo = await response.json();
    // console.log(bookInfo.docs[0].isbn[0])
    // console.log(bookInfo.docs[0].author_name[0])
    console.log(bookInfo.docs[0].first_sentence[0]);
    let newText = bookInfo.docs[0].first_sentence[0]
    const quote = document.querySelector('.quote')
    let newQuote = document.createElement('p')
    newQuote.innerHTML = `${newText} <td><a href="#" id="delete" class="btn btn-danger btn-sm delete">X</a></td>`
    quote.appendChild(newQuote)
    //work on delete
   //work on catch error 
  }
  
// Create book
function bookDetails(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
function displayBooks() {
    const books = getBooks();
    books.forEach((book) => addBookToList(book));
  }
//add book to list
  function addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }
//clear the input field once book is added
  function clearInputs() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
//delete book
  function deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
//delete quote
  function deleteQuote(el) {
    if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove()
    }
  }
//store books
  function getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  function addBook(book) {
    const books = getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  function removeBook(isbn) {
    const books = getBooks();
    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

//Display Book
document.addEventListener("DOMContentLoaded", displayBooks);

//Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  console.log(title)
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

    if (title === ""){
    alert("Please fill in all fields");
  } else {
    const book = new bookDetails(title, author, isbn);
    addBookToList(book);
    addBook(book);
    clearInputs();
    fetchBookInfo(title)
    
  }
});
// Remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
  deleteBook(e.target);
  removeBook(e.target.parentElement.previousElementSibling.textContent);
});
//Delete Quote
// document.querySelector('#delete').addEventListener('click', (e) => {
//     deleteQuote(e.target)
// })