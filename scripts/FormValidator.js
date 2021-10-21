// const hasInvalidInput = (inputList) => {
//   return inputList.some((input) => {
//     return input.validity.valid === false;
//   });
// };

// const toggleButtonState = (form, inputList, config) => {
//   const submitButton = form.querySelector(config.submitButtonSelector);
//   if (hasInvalidInput(inputList)) {
//     submitButton.classList.add(config.submitButtonClass);
//     submitButton.setAttribute("disabled", true);
//   } else {
//     submitButton.classList.remove(config.submitButtonClass);
//     submitButton.removeAttribute("disabled");
//   }
// };

// const showInputError = (input, inputError, config) => {
//   input.classList.add(config.invalidInputClass);
//   inputError.textContent = input.validationMessage;
//   inputError.classList.add(config.inputErrorClass);
// };

// const hideInputError = (input, inputError, config) => {
//   input.classList.remove(config.invalidInputClass);
//   inputError.classList.remove(config.inputErrorClass);
//   inputError.textContent = "";
// };

// const isValid = (form, input, config) => {
//   const inputError = form.querySelector(`.${input.id}-error`);
//   if (!input.validity.valid) {
//     showInputError(input, inputError, config);
//   } else {
//     hideInputError(input, inputError, config);
//   }
// };

// const setEventListeners = (form, config) => {
//   const inputList = Array.from(form.querySelectorAll(config.inputSelector));
//   inputList.forEach((input, index, inputList) => {
//     input.addEventListener("input", () => {
//       toggleButtonState(form, inputList, config);
//       isValid(form, input, config);
//     });
//   });
// };

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((form) => {
//     form.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(form, config);
//   });
// };

// const validationConfig = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__save-button",
//   invalidInputClass: "popup__input_state_invalid",
//   inputErrorClass: "popup__input-error_active",
//   submitButtonClass: "popup__save-button_inactive",
// }

// enableValidation(validationConfig);
