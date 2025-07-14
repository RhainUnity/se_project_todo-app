class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    return inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState = (inputElement) => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    if (this._hasInvalidInput()) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  resetValidation() {}
}

export default FormValidator;

// class FormValidator {
//   constructor(settings, formElement) {
//     this._settings = settings;
//     this._formElement = formElement;
//     this._inputSelector = settings.inputSelector;
//     this._submitButtonSelector = settings.submitButtonSelector;
//     this._errorClass = settings.errorClass;
//     this._inputErrorClass = settings.inputErrorClass;
//     this._inactiveButtonClass = settings.inactiveButtonClass;
//   }

//   _toggleButtonState = (inputList, buttonElement, settings) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(settings.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(settings.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// };

//   _setEventListeners = () => {
//     const inputList = Array.from(
//       this._formElement.querySelectorAll(this._inputSelector)
//     );
//     const buttonElement = this._formElement.querySelector(
//       this._submitButtonSelector
//     );

//     toggleButtonState(inputList, buttonElement, this._settings);

//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener("input", () => {
//         checkInputValidity(formElement, inputElement, settings);
//         toggleButtonState(inputList, buttonElement, settings);
//       });
//     });
//   };

//   enableValidation = (settings) => {
//     this._formElement.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     this._setEventListeners();
//   };
// }

// export default FormValidator;
