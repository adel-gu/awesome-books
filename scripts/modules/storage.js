// Storage Class
export class Storage {
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
