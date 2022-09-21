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

class BookApp {
  // get book template
  static #bookTemplate(book) {
    const bookTemplate = `
       <tr class="book-info">
         <td class="title">${book.title}</td>
         <td class="author">${book.author}</td>
         <td><button class="remove">Remove</button></td>
       </tr>
   `;
    return bookTemplate;
  }

  // Add Book to the UI
  static displayBook(container, book) {
    container.innerHTML += BookApp.#bookTemplate(book);
  }
}

const bookForm = document.forms[0];
const collections = document.querySelector('.collections');

// Display books when page is reloading
bookForm.add.addEventListener('click', (e) => {
  e.preventDefault();
  const title = bookForm.title.value;
  const author = bookForm.author.value;

  const book = new Book(title, author);
  BookApp.displayBook(collections, book);

  bookForm.reset();
});
