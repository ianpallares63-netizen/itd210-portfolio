document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const formWrap = document.getElementById('form-wrapper');
    const successCard = document.getElementById('success-card');
    const errorSummary = document.getElementById('error-summary');
    const errorSummaryList = document.getElementById('error-summary-list');

    const fieldName = document.getElementById('name');
    const fieldEmail = document.getElementById('email');
    const fieldSubject = document.getElementById('subject');
    const fieldMessage = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');

    const MIN_MSG = 20;
    const MAX_MSG = 500;

    // Displays inline error messages.
    function showError(inputEl, errorEl, message) {
        inputEl.style.borderColor = '#d9534f';
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    // Clears inline error messages.
    function clearError(inputEl, errorEl) {
        inputEl.style.borderColor = '#ccc';
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }

    // Validates every field in the form.
    function validateForm() {
        let errors = [];

    if (fieldName.value.trim() === '') {
        showError(fieldName, document.getElementById('name-error'), 'Name is required.');
        errors.push('Name is required.');
    } else {
        clearError(fieldName, document.getElementById('name-error'));
    }

    if (fieldEmail.value.trim() === '') {
        showError(fieldEmail, document.getElementById('email-error'), 'Email is required.');
        errors.push('Email is required.');
    } else {
        clearError(fieldEmail, document.getElementById('email-error'));
    }

    if (fieldSubject.value.trim() === '') {
        showError(fieldSubject, document.getElementById('subject-error'), 'Subject is required.');
        errors.push('Subject is required.');
    } else {
        clearError(fieldSubject, document.getElementById('subject-error'));
    }

    if (fieldMessage.value.trim().length < MIN_MSG) {
        showError(fieldMessage, document.getElementById('message-error'), 'Message must be at least 20 characters.');
        errors.push('Message too short.');
    } else {
        clearError(fieldMessage, document.getElementById('message-error'));
    }

    return errors;
    }

    // Handles form submission event.
    // How do i hate Javascript
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const errors = validateForm();

    if (errors.length > 0) {
        errorSummaryList.innerHTML = '';
        errors.forEach(err => {
            const li = document.createElement('li');
            li.textContent = err;
            errorSummaryList.appendChild(li);
        });
        errorSummary.style.display = 'block';
        errorSummary.focus();
    } else {
        errorSummary.style.display = 'none';
        formWrap.style.display = 'none';
        successCard.style.display = 'block';
        successCard.focus(); 
        }
    });

    // Updates the character counter as the user types.
    fieldMessage.addEventListener('input', () => {
        const len = fieldMessage.value.length;
        charCounter.textContent = `${len} / ${MAX_MSG} characters`;
    });

    // Toggles the hours panel on and off.
    const hoursToggle = document.getElementById('hours-toggle');
    const hoursPanel = document.getElementById('hours-panel');
    
    hoursToggle.addEventListener('click', () => {
        const isVisible = hoursPanel.style.display === 'block';
        hoursPanel.style.display = isVisible ? 'none' : 'block';
        hoursToggle.setAttribute('aria-expanded', String(!isVisible));
    });

    // Toggles questions when clicked.
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isVisible = answer.style.display === 'block';

        // Hide all panels
        document.querySelectorAll('.faq-answer').forEach(el => el.style.display = 'none');
        faqQuestions.forEach(el => el.setAttribute('aria-expanded', 'false'));

        // Toggle current panel
        answer.style.display = isVisible ? 'none' : 'block';
        btn.setAttribute('aria-expanded', String(!isVisible));
        });

    // Enables accessibility via Enter and Spacebar for keyboard users
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
  });
});