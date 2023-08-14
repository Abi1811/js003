document.addEventListener('DOMContentLoaded', () => {
    let isValid = false;
    // Function to populate the country codes dropdown
function populateCountryCodesDropdown() {
    const countryCodes = [
        { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
        { code: '+355', country: 'Albania', flag: '🇦🇱' },
        { code: '+213', country: 'Algeria', flag: '🇩🇿' },
        { code: '+376', country: 'Andorra', flag: '🇦🇩' },
        { code: '+244', country: 'Angola', flag: '🇦🇴' },
        { code: '+1268', country: 'Antigua and Barbuda', flag: '🇦🇬' },
        { code: '+54', country: 'Argentina', flag: '🇦🇷' },
        { code: '+374', country: 'Armenia', flag: '🇦🇲' },
        { code: '+61', country: 'Australia', flag: '🇦🇺' },
        { code: '+43', country: 'Austria', flag: '🇦🇹' },
        { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
        { code: '+1242', country: 'Bahamas', flag: '🇧🇸' },
        { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
        { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
        { code: '+246', country: 'Barbados', flag: '🇧🇧' },
        { code: '+375', country: 'Belarus', flag: '🇧🇾' },
        { code: '+32', country: 'Belgium', flag: '🇧🇪' },
        { code: '+501', country: 'Belize', flag: '🇧🇿' },
        { code: '+229', country: 'Benin', flag: '🇧🇯' },
        { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
        { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
        { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
        { code: '+267', country: 'Botswana', flag: '🇧🇼' },
        { code: '+55', country: 'Brazil', flag: '🇧🇷' },
        { code: '+673', country: 'Brunei', flag: '🇧🇳' },
        { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
        { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
        { code: '+257', country: 'Burundi', flag: '🇧🇮' },
        { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
        { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
        { code: '+1', country: 'Canada', flag: '🇨🇦' },
        { code: '+238', country: 'Cape Verde', flag: '🇨🇻' },
        { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
        { code: '+235', country: 'Chad', flag: '🇨🇩' },
      // Add more country codes and flags as needed
    ];
  
    const dropdown = document.getElementById('country-code');
    countryCodes.forEach((country) => {
      const option = document.createElement('option');
      option.value = country.code;
      option.text = `${country.flag} ${country.code} (${country.country})`;
      dropdown.add(option);
    });
  }
  
  function isValidEmail(email) {
    // Email validation logic (you can use a regular expression or any other method)
    // For simplicity, we'll use a basic check for the presence of '@' and '.'
    return email.includes('@') && email.includes('.');
  }

//   // Function to check if the email and confirm email fields match
  function checkEmailMatch() {
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('confirm-email').value;
  
    const emailMatch = email === confirmEmail;
    const emailField = document.getElementById('email');
    const confirmEmailField = document.getElementById('confirm-email');
  
    if (emailMatch) {
      emailField.classList.remove('invalid');
      confirmEmailField.classList.remove('invalid');
    } else {
      emailField.classList.add('invalid');
      confirmEmailField.classList.add('invalid');
    }
  
    return emailMatch;
  }
    
    function validateForm(event) {
    // Reset previous error messages
    const errorMessages = document.getElementsByClassName('error-message');
    for (const message of errorMessages) {
      message.textContent = '';
    }

    isValid = true;

  // Validate Full Name
  const fullNameInput = document.getElementById('fullName');
  const fullNameError = document.getElementById('fullNameError');
  if (fullNameInput.value.trim() === '') {
    fullNameError.textContent = 'Please enter your Full Name.';
    isValid = false;
  } else {
    fullNameError.textContent = '';
  }

  // Validate Mobile Number
  const mobileNumberInput = document.getElementById('mobileNumber');
  const mobileNumberError = document.getElementById('mobileNumberError');
  if (mobileNumberInput.value.trim() === '') {
    mobileNumberError.textContent = 'Please enter your Mobile Number.';
    isValid = false;
  } else {
    mobileNumberError.textContent = '';
  }

  // Validate Email
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
    emailError.textContent = 'Please enter a valid Email.';
    isValid = false;
  } else {
    emailError.textContent = '';
  }

  // Validate Confirm Email
  const confirmEmailInput = document.getElementById('confirm-email');
  const confirmEmailError = document.getElementById('confirmEmailError');
  if (confirmEmailInput.value.trim() === '' || emailInput.value !== confirmEmailInput.value) {
    confirmEmailError.textContent = 'Email and Confirm Email do not match.';
    isValid = false;
  } else {
    confirmEmailError.textContent = '';
  }

  // Validate Gender
  const genderSelect = document.getElementById('gender');
  const genderError = document.getElementById('genderError');
  if (genderSelect.value === '') {
    genderError.textContent = 'Please select your Gender.';
    isValid = false;
  } else {
    genderError.textContent = '';
  }

  // Show error message if any field is not valid
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = isValid ? 'none' : 'block';

  return isValid;
}


  // Function to update the "Continue with purchase" button status
  function updateContinueButton() {
    const fullName = document.getElementById('fullName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const emailMatch = checkEmailMatch();
  
    const continueButton = document.getElementById('continue-btn');
  
    if (fullName && mobileNumber && emailMatch) {
      continueButton.removeAttribute('disabled');
    } else {
      continueButton.setAttribute('disabled', 'true');
    }
  }
  
  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
  
    // Save user inputs to local storage
    localStorage.setItem('fullName', document.getElementById('fullName').value);
    localStorage.setItem('mobileNumber', document.getElementById('mobileNumber').value);
    localStorage.setItem('email', document.getElementById('email').value);
    localStorage.setItem('gender', document.getElementById('gender').value);
  
    // Redirect to the "Payment" page
    window.location.href = 'payment.html';
  }
  
  // Event listeners
  
    populateCountryCodesDropdown();
    updateContinueButton();

    document.getElementById('fullName').addEventListener('input', updateContinueButton);
    document.getElementById('mobileNumber').addEventListener('input', updateContinueButton);
    document.getElementById('email').addEventListener('input', updateContinueButton);
    document.getElementById('confirm-email').addEventListener('input', updateContinueButton);
    document.getElementById('gender').addEventListener('change', updateContinueButton);
    
    document.getElementById('details-form').addEventListener('submit', handleSubmit);
    

   
  });