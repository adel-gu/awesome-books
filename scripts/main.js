// Book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  getBookDetails() {
    return { title: this.title, author: this.author };
  }
}

class Storage {
  static #books = [];

  // check for existance of local storage.
  static #checkStorage() {
    return localStorage.getItem('Books');
  }

  // get books from local storage
  static getBooksFromStorage() {
    if (Storage.#checkStorage()) {
      Storage.#books = JSON.parse(localStorage.getItem('Books'));
    }

    return Storage.#books;
  }

  // save book to local storage
  static saveBook(book) {
    // check for existing local storage data.
    if (Storage.#checkStorage()) {
      Storage.#books = JSON.parse(localStorage.getItem('Books'));
    }

    Storage.#books.push(book);
    localStorage.setItem('Books', JSON.stringify(Storage.#books));
  }

  // Unsave the book from local storage
  static unsaveBook(index) {
    if (Storage.#checkStorage()) {
      let books = Storage.#books;
      books = books.filter((book) => {
        return books.indexOf(book) !== index;
      });
      localStorage.clear();
      localStorage.setItem('Books', JSON.stringify(books));
    }
  }
}

class BookApp {
  // get book template
  static #bookTemplate(book) {
    const bookTemplate = `
       <tr class="book-info">
         <td class="title">${book.title}</td>
         <td class="author">${book.author}</td>
         <td class="d-flex justify-content-end"><button class="btn btn-outline-dark remove">Remove</button></td>
       </tr>
   `;
    return bookTemplate;
  }

  // Add Book to the UI
  static displayBook(container, book) {
    container.innerHTML += BookApp.#bookTemplate(book);
  }

  // Delete book from screen
  static deleteBook(btn) {
    btn.parentElement.parentElement.remove();
  }

  // Display Books when page realods
  static displayBooks(container) {
    const books = Storage.getBooksFromStorage();
    books.forEach((book) => {
      BookApp.displayBook(container, book);
    });
  }
}

class Validation {
  static unValidInput(title, author) {
    const inputs = [title, author].filter((input) => {
      return input.value === '';
    });

    inputs.map((input) => {
      input.classList.add('border-danger');
    });
  }

  static validInput(title, author) {
    const inputs = [title, author].filter((input) => {
      return input.value !== '';
    });

    inputs.map((input) => {
      input.classList.remove('border-danger');
    });
  }
}

// HTML DOM Elements
const bookForm = document.forms[0];
const collections = document.querySelector('.collections');

// Display books when page is reloading
bookForm.add.addEventListener('click', (e) => {
  e.preventDefault();
  const title = bookForm.title;
  const author = bookForm.author;

  if (title.value === '' || author.value == '') {
    Validation.unValidInput(title, author);
    Validation.validInput(title, author);
  } else {
    Validation.validInput(title, author);
    const book = new Book(title.value, author.value);
    Storage.saveBook(book);
    BookApp.displayBook(collections, book);

    bookForm.reset();
  }
});

// Remove books
collections.addEventListener('click', (e) => {
  if ([...e.target.classList].includes('remove')) {
    const removeBtn = e.target;
    const bookIndex = [...collections.querySelectorAll('.remove')].indexOf(
      removeBtn
    );

    // remove from screen
    BookApp.deleteBook(removeBtn);
    // remove from local storage
    Storage.unsaveBook(bookIndex);
  }
});

// Display books when page is reloading
document.addEventListener(
  'DOMContentLoaded',
  BookApp.displayBooks(collections)
);
