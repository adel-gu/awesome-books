// Book class
export class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  getBookDetails() {
    return { title: this.title, author: this.author };
  }
}
