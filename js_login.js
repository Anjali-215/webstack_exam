
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const dob = document.getElementById('dob');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const dobError = document.getElementById('dobError');
    let valid = true;

    // Full Name validation
    if (!/^[a-zA-Z\s]{3,}$/.test(fullName.value)) {
        fullName.classList.add('invalid');
        nameError.textContent = 'Name must contain only letters and spaces, with at least 3 characters.';
        valid = false;
    } else {
        fullName.classList.remove('invalid');
        fullName.classList.add('valid');
        nameError.textContent = '';
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        email.classList.add('invalid');
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
    } else {
        email.classList.remove('invalid');
        email.classList.add('valid');
        emailError.textContent = '';
    }

    // Password validation
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value)) {
        password.classList.add('invalid');
        passwordError.textContent = 'Password must be at least 8 characters long and contain both letters and numbers.';
        valid = false;
    } else {
        password.classList.remove('invalid');
        password.classList.add('valid');
        passwordError.textContent = '';
    }

    // Confirm Password validation
    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('invalid');
        confirmPasswordError.textContent = 'Passwords do not match.';
        valid = false;
    } else {
        confirmPassword.classList.remove('invalid');
        confirmPassword.classList.add('valid');
        confirmPasswordError.textContent = '';
    }

    // Date of Birth validation
    const today = new Date();
    const birthDate = new Date(dob.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob.value) || age < 18) {
        dob.classList.add('invalid');
        dobError.textContent = 'You must be at least 18 years old.';
        valid = false;
    } else {
        dob.classList.remove('invalid');
        dob.classList.add('valid');
        dobError.textContent = '';
    }

    // Submit the form if all fields are valid
    if (valid) {
        alert("Registration successful!");
        window.location.href = '../Home/home.html'; // Redirect to the desired page
    }
});

document.getElementById('loginLink').addEventListener('click', function() {
    window.location.href = 'login.html'; // Redirect to the login page
});
