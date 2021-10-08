const isValid = (form, input) => {
  // console.log(form);
  const error = form.querySelector(`.${input.id}-error`);
  // console.log(error);
  if (!input.validity.valid) {

  }
}

const setEventListeners = (form) => {
  const inputList = Array.from(form.elements);
  // console.log(inputList);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.forms);
  // console.log(formList);
  formList.forEach((form) => {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

enableValidation();
