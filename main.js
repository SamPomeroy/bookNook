//API url
const bookAPI = "https://openlibrary.org/search.json"


//search API-change all to .then and try again
async function fetchBookInfo() {
    let title = document.querySelector('#title')
    const response = await fetch(`https://openlibrary.org/search.json?title=${'title'}`);
    const bookInfo = await response.json();
    console.log(bookInfo);
    
    // document.querySelector('.quote').innerHTML = ${obj[0].docs.author_name} (cant find first sentence in every object)
    
  }
  fetchBookInfo()
  //fetching YAY
  
// Create book
function bookDetails(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// Create an empty array to store the bookList
    const bookList = [];


// Add a new book to the array when the "Add Book" button is clicked
 document.getElementById('addBook').addEventListener('click', () => {
  const book = document.getElementById('title').value;
  bookList.push(book);

  // Clear the input field
//   document.getElementById('title').value = '';

  // Update the Book List
  addBookToList();
});

// Update the Book List to display the current book
function addBookToList(book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr')

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
 `;

  // Create a new listed book for each book
      
  list.appendChild(row);
}