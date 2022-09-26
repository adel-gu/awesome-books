/* eslint-disable max-classes-per-file */
import * as Base from './modules/base.js';

// HTML DOM Elements.
const bookForm = document.forms[0];
const collections = document.querySelector('.collections');
const navLinks = document.querySelectorAll('.nav-link');

// App functions.
Base.addBook(bookForm, collections);
Base.removeBook(collections);
Base.loadBooks(collections);
Base.spa(navLinks);
