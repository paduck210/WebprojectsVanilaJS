const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// parentElement - Get parent element of selected element
// element.querySelector <--- is possible, only search inside of the elements
// The reason do as below way is
// Form contains 1. input field 2. small field
// User is only going to pass input as a parameter,
// so need to grab 2 elements using, input, moving upside/down
// TRY TO THINK LOGICALLY, AVOID USE TOO MANY ARGUMETN UNECCESARLY

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is wrong");
  }
}

function checkPasswordMatch(password, password2) {
  if (password.value === password2.value) {
    showSuccess(password2);
  } else {
    showError(password2, "Not matched");
  }
}

// Check required fields
// Looping element
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    // trim - remove space
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} can't be empty`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} should be less than ${max} characters`
    );
  } else if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} should be more than ${min} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Transfer value to caplitalized
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Passing Erray
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, password, email, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
