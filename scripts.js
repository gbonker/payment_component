window.onload = function() {
  var allFieldsAreValid = true;

  var submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", function(event){
    var formIsValid = validateForm();
    if (!formIsValid) {
      event.preventDefault();
    }
  });

  function validateForm() {
    validateName();
    validateCreditCard();
    validateCVV2();
    validateExpMonth();
    validateExpYear();
    if (validateName() && validateCreditCard() && validateCVV2() && validateExpMonth() && validateExpYear()) {
      allFieldsAreValid = true;
    }
    return allFieldsAreValid;
  }

  function validateName() {
    var name = document.forms["payment-form"]["name"].value;
    var errorMessage = document.getElementById("name-field-error");
    if (name == "") {
      errorMessage.innerText = "Name is required.";
      allFieldsAreValid = false;
    } else {
      errorMessage.innerText = "";
      return true;
    }
  }

  var typeOfCardUserEntered = null;

  function validateCreditCard() {
    var creditCardNumber = document.forms["payment-form"]["card-number"].value;
    var errorMessage = document.getElementById("card-number-field-error");

    if (creditCardNumber == "") {
      errorMessage.innerText = "Credit card number is required."  
      allFieldsAreValid = false;
    } else {
      var visaValidator = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      var amexValidator = /^(?:3[47][0-9]{13})$/;
      if (creditCardNumber.match(visaValidator)) {  
        errorMessage.innerText = "";
        typeOfCardUserEntered = "visa"; 
        return true;  
      } else if (creditCardNumber.match(amexValidator)) {
        errorMessage.innerText = "";
        typeOfCardUserEntered = "amex"; 
        return true; 
      } else {  
        errorMessage.innerText = "Please enter a valid Visa or American Express credit card number."  
        allFieldsAreValid = false; 
      } 
    }
  }

  function validateCVV2() {
    var cVV2Number = document.forms["payment-form"]["cvv2"].value;
    var errorMessage = document.getElementById("cvv2-field-error");

    if (cVV2Number == "") {
      errorMessage.innerText = "CVV2 is required."
      allFieldsAreValid = false;
    } else if (cVV2Number < 99 || cVV2Number > 9999) {
      errorMessage.innerText = "CVV2 numbers are either 3 or 4 digits."
      allFieldsAreValid = false;
    } else {
      if (typeOfCardUserEntered === "visa") {
        if (cVV2Number > 99 && cVV2Number < 1000) {
          errorMessage.innerText = "";
          return true;
        } else {
          errorMessage.innerText = "Visa cards have 3-digit CVV2 numbers."
          allFieldsAreValid = false;
        }
      } else if (typeOfCardUserEntered === "amex") {
        if (cVV2Number > 999 && cVV2Number < 10000) {
          errorMessage.innerText = "";
          return true;
        } else {
          errorMessage.innerText = "American Express cards have 4-digit CVV2 numbers."
          allFieldsAreValid = false;
        }
      } else {
        if (cVV2Number > 99 && cVV2Number < 10000) {
          errorMessage.innerText = "";
          return true;
        } else {
          errorMessage.innerText = "CVV2 numbers are either 3 or 4 digits."
          allFieldsAreValid = false;
        }
      }
    }
  }

  function validateExpMonth() {
    var expMonthNumber = document.forms["payment-form"]["exp-month"].value;
    var errorMessage = document.getElementById("exp-month-field-error");

    if (expMonthNumber == "") {
      errorMessage.innerText = "Exp. month is required."
      allFieldsAreValid = false;
    } else if (expMonthNumber < 01 || expMonthNumber > 12) {
      errorMessage.innerText = "Please enter a number between 01 and 12."
      allFieldsAreValid = false;
    } else {
      errorMessage.innerText = "";
      return true;
    }
  }

  function validateExpYear() {
    var expYearNumber = document.forms["payment-form"]["exp-year"].value;
    var expMonthNumber = document.forms["payment-form"]["exp-month"].value;
    var errorMessage = document.getElementById("exp-year-field-error");
    var today = new Date();

    if (expYearNumber == "") {
      errorMessage.innerText = "Exp. year is required."
      allFieldsAreValid = false;
    } else if (expYearNumber < 0 || expYearNumber > 10000 || (expYearNumber > 99 && expYearNumber < 1000)) {
      errorMessage.innerText = "Please enter a valid year (e.g. 18 or 2018)"
      allFieldsAreValid = false;
    } else {
      // allow the user to enter either a 2-digit or 4-digit year, but evaluate as a 4 digit year
      if (expYearNumber < 100) {
        expYearNumber += 2000;
      }

      if (expYearNumber < today.getFullYear()) {
        errorMessage.innerText = "Your credit card is expired. Please use an unexpired card."
        allFieldsAreValid = false;
      } else if (expYearNumber == today.getFullYear()) {
        if (expMonthNumber > today.getMonth()+1) {
          errorMessage.innerText = "";
          return true;
        } else {
          errorMessage.innerText = "Your credit card is expired. Please use an unexpired card."
          allFieldsAreValid = false;
        }
      } else {
        errorMessage.innerText = "";
        return true;
      }
    }
  }

}