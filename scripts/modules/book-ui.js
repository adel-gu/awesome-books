import { Storage } from './storage.js';
// App ui class
export class BookUI {
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
    container.innerHTML += BookUI.#bookTemplate(book);
  }

  // Delete book from screen
  static deleteBook(btn) {
    btn.parentElement.parentElement.remove();
  }

  // Display Books when page realods
  static displayBooks(container) {
    const books = Storage.getBooksFromStorage();
    books.forEach((book) => {
      BookUI.displayBook(container, book);
    });
  }
}
