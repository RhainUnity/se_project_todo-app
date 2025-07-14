class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _createCheckboxEl() {
    this.todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this.todoLabel = this._todoElement.querySelector(".todo__label");
    this.todoCheckboxEl.checked = this._data.completed;
    this.todoCheckboxEl.id = `todo-${this._data.id}`;
    this.todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _createDueDate() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this.todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _setEventListeners() {
    this.todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this.todoCheckboxEl.checked;
    });

    this.todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    this.todoNameEl = this._todoElement.querySelector(".todo__name");
    this.todoDate = this._todoElement.querySelector(".todo__date");
    this.todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this.todoNameEl.textContent = this._data.name;

    this._createDueDate();
    this._createCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
