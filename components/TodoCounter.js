export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length; // number of completed todos
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed++;
    } else if (this._completed > 0) {
      this._completed--;
    }
    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment) {
      this._total++;
    } else if (this._total > 0) {
      this._total--;
    }
    this._updateText();
  };

  _updateText() {
    // Sets the text content of corresponding text element.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
