import { Book } from './book.js';
import { BookUI } from './book-ui.js';
import { Validation } from './validation.js';
import { Storage } from './storage.js';

// Add book
const addBook = (bookForm, collections) => {
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
      BookUI.displayBook(collections, book);

      bookForm.reset();
    }
  });
};

// Remove Book
const removeBook = (collections) => {
  collections.addEventListener('click', (e) => {
    if ([...e.target.classList].includes('remove')) {
      const removeBtn = e.target;
      const bookIndex = [...collections.querySelectorAll('.remove')].indexOf(
        removeBtn
      );

      // remove from screen
      BookUI.deleteBook(removeBtn);
      // remove from local storage
      Storage.unsaveBook(bookIndex);
    }
  });
};

// Loads books.
const loadBooks = (collections) => {
  document.addEventListener(
    'DOMContentLoaded',
    BookUI.displayBooks(collections)
  );
};

// Single Page Application "showing and hiding sections"
const spa = (navLinks) => {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const page = document.querySelector(
        `#${link.getAttribute('data-trigger')}`
      );

      // remove active class from all links
      document.querySelector('.active').classList.remove('active');
      // add active class to current class
      link.classList.add('active');
      // remove current class from the one who have it.
      document.querySelector('.current').classList.remove('current');
      // add the current class to the current section
      page.classList.add('current');
    });
  });
};

export { addBook, removeBook, loadBooks, spa };
