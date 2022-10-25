import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

refs.input.setAttribute('required', '');
refs.textarea.setAttribute('required', '');

populateFormInput();

let message = localStorage.getItem(STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(STORAGE_KEY))
  : {};

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  message = {};
}

function onFormInput(event) {
  message[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(message));
}

function populateFormInput() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const getMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    refs.input.value = getMessage.email || '';
    refs.textarea.value = getMessage.message || '';
  }
}
