//API url
const bookAPI = "https://openlibrary.org/search.json"
const titleInput = document.querySelector('#title')
const Btn = document.querySelector('#addBook')
//search API
async function fetchBookInfo() {
    // let title = document.querySelector('#title').value
    const response = await fetch(`https://openlibrary.org/search.json?q=${'#title.value'}`);
    const bookInfo = await response.json();
    console.log(bookInfo);
  }
  fetchBookInfo()
  //it was pulling info now its an empty array idk what I did ha

  //create book
// function bookDetails (title, author, isbn)

//add book

//clear input

//delete book

//event listeners

// Btn.addEventListener('click', () => {
//     fetchBookInfo();
// })