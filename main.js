// openLibraryAPI url = "https://openlibrary.org/search.json"
// openLibraryCovers url = "https://covers.openlibrary.org/b/isbn/0385472579-S.jpg"



// search API & display title, author, isbn & first sentence
async function fetchBookInfo(title) {
    let titleInput = document.querySelector('#title')
    let authorInput = document.querySelector('#author')
    let isbnInput = document.querySelector('#isbn')
    
    // fetch  
    try {

        const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
        const bookInfo = await response.json();
        // display title
        let titleTitle = bookInfo.docs[0].title;
        titleInput.value = `${titleTitle}`;
        // display author
        let titleAuthor = bookInfo.docs[0].author_name[0];
        authorInput.value = `${titleAuthor}`;
        // display isbn
        let titleISBN = bookInfo.docs[0].isbn[0];
        isbnInput.value = `${titleISBN}`;
        //display first sentence
        let newText = bookInfo.docs[0].first_sentence[0];
        const quote = document.querySelector('.quote');
        let newQuote = document.createElement('p');
        newQuote.innerHTML = `"${newText}"`
        quote.appendChild(newQuote)
        
    } catch (error) {
       console.log(error) 
    }
   
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
  
  // add book to list
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
  
  // clear the input field once book is added
  function clearInputs() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
      document.querySelector('#apiInput').value = '';
  }
  
  // delete book
  function deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
  
  // book storage
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
  
  // eventListeners
  
  // display Book
  document.addEventListener("DOMContentLoaded", displayBooks);
  
  // search title
  document.querySelector('#api-form').addEventListener('submit', (e) =>{
  e.preventDefault();
  const apiInput = document.querySelector('#apiInput').value;
  console.log(apiInput)
  fetchBookInfo(apiInput)
  })
  
  // add book
  document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  console.log(title)
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  
  
  if (title === ""){
      alert("Please fill in title");
    } else {
        const book = new bookDetails(title, author, isbn);
        addBookToList(book);
        addBook(book);
        clearInputs();
        document.querySelector('#quote').innerHTML = '';
    
    }
  });
  
  // remove book
  document.querySelector('#book-list').addEventListener('click', (e) => {
  deleteBook(e.target);
  removeBook(e.target.parentElement.previousElementSibling.textContent);
  });
  
  