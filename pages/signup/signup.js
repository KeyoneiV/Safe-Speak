
// === Imports ===

import { postData } from "../../utils/ApiHandler.js";

// === Elements ===

const signupForm = document.getElementById('signup-form');
const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');
const submitButton = document.getElementById('submit-btn');

const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');

const step1Indicator = document.getElementById('step-1-indicator');
const step2Indicator = document.getElementById('step-2-indicator');

const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// === Helper Functions ===

function displayError(elementId, message) {
    const errorSpan = document.getElementById(elementId);
    const inputElement = document.getElementById(elementId.replace('-error', ''));

    if (message) {
        if (errorSpan) errorSpan.textContent = message;
        if (inputElement) inputElement.classList.add('error');
    } else {
        if (errorSpan) errorSpan.textContent = '';
        if (inputElement) inputElement.classList.remove('error');
    }
}

function validateStep1() {
    let isValid = true;
    displayError('username-error', '');
    displayError('email-error', '');

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();

    if (username.length < 3) {
        displayError('username-error', 'Username must be at least 3 characters.');
        isValid = false;
    }

    if (!email.includes('@')) {
        displayError('email-error', 'Please enter a valid email.');
        isValid = false;
    }

    return isValid;
}

function validateStep2() {
    let isValid = true;
    displayError('password-error', '');
    displayError('confirm-password-error', '');

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password.length < 8) {
        displayError('password-error', 'Password must be at least 8 characters.');
        isValid = false;
    }

    if (password !== confirmPassword) {
        displayError('confirm-password-error', 'Passwords do not match.');
        isValid = false;
    }

    return isValid;
}

function goToStep(stepNumber) {
    if (stepNumber === 1) {
        step1.classList.remove('hidden');
        step2.classList.add('hidden');
        step1Indicator.classList.add('active');
        step2Indicator.classList.remove('active');
    } else {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
        step1Indicator.classList.remove('active');
        step2Indicator.classList.add('active');
    }
}

// === Event Handlers ===
nextButton.addEventListener('click', () => {
    if (validateStep1()) {
        goToStep(2);
    }
});

backButton.addEventListener('click', () => {
    goToStep(1);
});

// === Final Form Submit ===
async function submitForm(e) {
    e.preventDefault();

    if (!validateStep2()) {
        displayError('server-error', '');
        return;
    }

    const data = {
        isAccount: true,
        Username: usernameInput.value,
        Email: emailInput.value,
        Password: passwordInput.value,
        OtherData: null
    }

    submitButton.textContent = 'Signing Up...';
    submitButton.disabled = true;
    displayError('server-error', '');

    try {
        const responseData = await postData(data);

        if (responseData && responseData.status === 'success') {
            displayError('server-error', 'Success! Redirecting...');
            submitButton.textContent = 'Signed Up!';
            submitButton.style.backgroundColor = '#28a745';
            // window.location.href = '/login.html'; // Uncomment when ready
        } else {
            const serverMessage = responseData.message || 'Signup failed due to a server error.';
            displayError('server-error', serverMessage);
            submitButton.textContent = 'Sign Up';
            submitButton.disabled = false;
        }

    } catch (err) {
        console.error('Network or API Error:', err);
        displayError('server-error', 'A network error occurred. Please try again.');
        submitButton.textContent = 'Sign Up';
        submitButton.disabled = false;
    }
}

signupForm.addEventListener('submit', submitForm);
