// Validate empty inputs
export class Validation {
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
