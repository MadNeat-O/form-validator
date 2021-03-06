// Variables
const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const togglePassword = document.getElementById('togglePassword')

// Functions
const showError = (input, message) => {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message;
}

const showSuccess = (input) => {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
      showSuccess(input)
    } else {
      showError(input, 'Email is not valid')
    }
}

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value === '') {
      showError(input, `${getFieldName(input)} is required`)
    }
  })
}

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
     showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`)
  } else {
    showSuccess(input )
  }
}

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match')
  } else {
    showSuccess(input1);
    showSuccess(input2)
  }
}

const toggleShowPassword = (input) => {

}

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (username.value === '') {
    showError(username, 'Username is required')
  } else {
    showSuccess(username)
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkEmail(email);
  checkPasswordsMatch(password, password2)
})

togglePassword.addEventListener('click', (e) => {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  togglePassword.classList.toggle('fa-eye-slash');
})
