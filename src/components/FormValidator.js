export class FormValidator {
    constructor(obj, form) {
        this._configurator = obj;
        this._form = form;
    }

    _showInputError(input) {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);

        input.classList.add(this._configurator.inputErrorClass);
    
        this._errorElement.textContent = input.validationMessage;
        this._errorElement.classList.add(this._configurator.errorClass);
    }

    _hideInputError(input) {
        this._errorElement = this._form.querySelector(`.${input.id}-error`);
    
        input.classList.remove(this._configurator.inputErrorClass);
    
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._configurator.errorClass);
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }

    _hasInvalidInput(inputArray) {
        return inputArray.some((input) => {
            return !input.validity.valid;
        });
    }

    _toggleButton(inputArray, button) {
        if (this._hasInvalidInput(inputArray)) {
            button.classList.add(this._configurator.inactiveButtonClass);
            button.setAttribute('disabled', true);
        } else {
            button.classList.remove(this._configurator.inactiveButtonClass);
            button.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        const inputArray = Array.from(this._form.querySelectorAll(this._configurator.inputSelector));
        const button = this._form.querySelector(this._configurator.submitButtonSelector);

        inputArray.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButton(inputArray, button);
            });
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        this._setEventListeners();
    }

    resetValidation() {
        const inputArray = Array.from(this._form.querySelectorAll(this._configurator.inputSelector));
        const button = this._form.querySelector(this._configurator.submitButtonSelector);

        this._toggleButton(inputArray, button);
        inputArray.forEach((input) => {
            this._hideInputError(input);
        })
    }
}