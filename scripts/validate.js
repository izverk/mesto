const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return input.validity.valid === false;
  });
};

const toggleButtonState = (form, inputList) => {
  const submitButton = form.querySelector(".popup__save-button");
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add("popup__save-button_inactive");
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.classList.remove("popup__save-button_inactive");
    submitButton.removeAttribute("disabled");
  }
};

const showInputError = (input, inputError) => {
  input.classList.add("popup__input_type_error");
  inputError.textContent = input.validationMessage;
  inputError.classList.add("popup__input-error_active");
};

const hideInputError = (input, inputError) => {
  input.classList.remove("popup__input_type_error");
  inputError.classList.remove("popup__input-error_active");
  inputError.textContent = " ";
};

const isValid = (form, input) => {
  const inputError = form.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, inputError);
  } else {
    hideInputError(input, inputError);
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  inputList.forEach((input, index, inputList) => {
    input.addEventListener("input", () => {
      toggleButtonState(form, inputList);
      isValid(form, input);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.forms);
  formList.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

enableValidation();
