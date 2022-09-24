/* eslint-disable max-classes-per-file */

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
      books = books.filter((book) => books.indexOf(book) !== index);
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
    const inputs = [title, author].filter((input) => input.value === '');

    inputs.forEach((input) => {
      input.classList.add('border-danger');
    });
  }

  static validInput(title, author) {
    const inputs = [title, author].filter((input) => input.value !== '');

    inputs.forEach((input) => {
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
  const { title } = bookForm;
  const { author } = bookForm;

  if (title.value === '' || author.value === '') {
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

// Single Page Application "showing and hiding sections"
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const page = document.querySelector(
      `#${link.getAttribute('data-trigger')}`
    );

    // remove current class from the one who have it.
    document.querySelector('.current').classList.remove('current');
    // add the current class to the current section
    page.classList.add('current');
  });
});

// Time and Date
const time = document.querySelector('.time');
const date = document.querySelector('.date');

function formatTime(date) {
  const hour = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let state;

  if (date.getHours() < 12) {
    state = 'am';
  } else {
    state = 'pm';
  }

  return `${hour.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${state}`;
}

function formatDate(date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  let state;

  switch (day) {
    case 1:
      state = 'st';
      break;
    case 2:
      state = 'nd';
      break;
    default:
      state = 'th';
      break;
  }

  return `${months[month]} ${day}${state} ${year},`;
}

setInterval(() => {
  const today = new Date();

  time.textContent = formatTime(today);
  date.textContent = formatDate(today);
}, 1000);
