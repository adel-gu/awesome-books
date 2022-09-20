const bookForm = document.forms[0];
const collections = document.querySelector('.collections');

// add books to the window.
// add book to local storage.
// when the page load books from local storage then display books.

// Get the user inputs
function getNewBookData() {
  const booktTitle = bookForm.title.value;
  const bookAuthor = bookForm.author.value;

  // create new book.
  const book = {
    title: booktTitle,
    author: bookAuthor,
  };

  return book;
}

// Add the new book to local storage
function addNewBook(e) {
  e.preventDefault();
  saveBook(getNewBookData());
  bookForm.submit();
}

// save the book in local sotrage
function saveBook(book) {
  let books = [];
  // check for existing local storage data.
  if (localStorage.getItem('Books')) {
    books = JSON.parse(localStorage.getItem('Books'));
  }

  books.push(book);
  localStorage.setItem('Books', JSON.stringify(books));
}

// Display the collections of books
function displayBook() {
  // check for existing local storage data.
  if (localStorage.getItem('Books')) {
    const books = JSON.parse(localStorage.getItem('Books'));
    books.forEach((book) => {
      const bookTemplate = `
        <tr class="book-info">
          <td class="title">${book.title}</td>
          <td class="author">${book.author}</td>
          <td><button class="remove">Remove</button></td>
        </tr>
    `;

      collections.innerHTML += bookTemplate;
    });
  }
}

displayBook();
bookForm.addEventListener('submit', addNewBook);

// Remove Book
function removeBook(index) {
  if (localStorage.getItem('Books')) {
    let books = JSON.parse(localStorage.getItem('Books'));
    books.splice(index, 1);
    localStorage.clear();
    localStorage.setItem('Books', JSON.stringify(books));
  }
}

// Remove Book
collections.querySelectorAll('.remove').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    removeBook(index);
    btn.parentElement.parentElement.remove();
  });
});