const showInputError = (form, input, obj) => {
    const errorElement = form.querySelector(`.${input.id}-error`);

    input.classList.add(obj.inputErrorClass);

    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(obj.errorClass);
};

const hideInputError = (form, input, obj) => {
    const errorElement = form.querySelector(`.${input.id}-error`);

    input.classList.remove(obj.inputErrorClass);

    errorElement.textContent = '';
    errorElement.classList.remove(obj.errorClass);
};

const checkInputValidity = (form, input, obj) => {
    if (!input.validity.valid) {
        showInputError(form, input, obj);
    } else {
        hideInputError(form, input, obj);
    }
}

const setEventListeners = (form, obj) => {
    const inputArray = Array.from(form.querySelectorAll(obj.inputSelector));
    const button = form.querySelector(obj.submitButtonSelector);

    inputArray.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, obj);
            toggleButton(inputArray, button, obj);
        });
    });
};

const enableValidation = (obj) => {
    const formArray = Array.from(document.querySelectorAll(obj.formSelector));

    formArray.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setEventListeners(form, obj);
    });
};

const hasInvalidInput = (inputArray) => {
    return inputArray.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButton = (inputArray, button, obj) => {
    if (hasInvalidInput(inputArray)) {
        button.classList.add(obj.inactiveButtonClass);
        button.setAttribute('disabled', true);
    } else {
        button.classList.remove(obj.inactiveButtonClass);
        button.removeAttribute('disabled');
    }
};

enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});