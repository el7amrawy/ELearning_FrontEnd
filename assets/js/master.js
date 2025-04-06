
/* ================>>> Register <<<================= */

const form = document.getElementById('form');
const username = document.getElementById('username');
const second = document.getElementById('second');
const email = document.getElementById('email');
const password = document.getElementById('password');

if(form)form.addEventListener('submit', e => {
    if(!validateInputs())
        e.preventDefault();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const secondValue = second.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    let bool = true;

    if(usernameValue === '') {
        setError(username, 'Username is required');
        bool = false;
    } else {
        setSuccess(username);
    }
    if(secondValue === '') {
        setError(second, 'second is required');
        bool = false;
    } else {
        setSuccess(second);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        bool = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        bool = false;
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
        bool = false;
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
        bool = false;
    } else {
        setSuccess(password);
    }
    return bool;
};
