export default class TodoCounter {
  constructor(todos, selector) {
    // this._element = // select the appropriate element
    // this._completed = // number of completed todos
    // this._total = // the total number of todos
  }

  updateCompleted = (increment) => {};

  updateTotal = (increment) => {
    // if increment is true, add 1 to this._total. Otherwise,
    // subtract 1. In either case, call the method to update the
    // text content.
  };

  _updateText() {
    // Sets the text content of corresponding text element.
    // Call this in the constructor, and whenever the counts get updated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
