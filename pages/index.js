import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

///TASKS COMPLETED COUNTER
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const todoCompleted = (completed) => {
  todoCounter.updateCompleted(completed);
};

const todoDeleted = (deleted) => {
  todoCounter.updateTotal(deleted);
};

///NEW SECTION INSTANTIATE
const section = new Section({
  data: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", todoCompleted, todoDeleted);
    const todoElement = todo.getView();
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

///HANDLE INPUT FORM
const addTodoPopup = new PopupWithForm("#add-todo-popup", (inputValues) => {
  const id = uuidv4();

  // Create a date object and adjust for timezone
  const date = new Date(inputValues.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const todo = new Todo(
    {
      id,
      name: inputValues.name,
      date,
      completed: false,
    },
    "#todo-template",
    todoCompleted,
    todoDeleted
  );
  const todoElement = todo.getView();
  section.addItem(todoElement);

  todoCounter.updateTotal(true);

  addTodoPopup.close();
  addTodoForm.reset();
  todoFormValidator.resetValidation();
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

///Form Validation
const todoFormValidator = new FormValidator(validationConfig, addTodoForm);
todoFormValidator.enableValidation();
