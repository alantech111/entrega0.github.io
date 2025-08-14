document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginAlert = document.getElementById('loginAlert');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    // Función para mostrar alerta
    function showAlert(message, isError = true) {
        loginAlert.textContent = message;
        loginAlert.classList.remove('d-none', 'alert-success', 'alert-danger');
        loginAlert.classList.add(isError ? 'alert-danger' : 'alert-success');
    }

    // Función para guardar la sesión
    function saveSession(email, remember) {
        const sessionData = {
            email: email,
            loggedIn: true,
            timestamp: new Date().getTime()
        };

        sessionStorage.setItem('userSession', JSON.stringify(sessionData));
        
        if (remember) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
    }

    // Función para redireccionar
    function redirectToHome() {
        window.location.href = 'index.html';
    }

    // Validar formato de email
    function isValidEmail(email) {
        return email.includes('@') && email.length > 3;
    }

    // Validar campos
    function validateForm() {
        let isValid = true;
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        
        // Validar email
        if (!emailValue) {
            emailInput.classList.add('is-invalid');
            emailInput.nextElementSibling.textContent = 'Por favor ingrese su email';
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            emailInput.classList.add('is-invalid');
            emailInput.nextElementSibling.textContent = 'Ingrese un email válido (debe contener @)';
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
        }
        
        // Validar contraseña
        if (!passwordValue) {
            passwordInput.classList.add('is-invalid');
            isValid = false;
        } else {
            passwordInput.classList.remove('is-invalid');
        }
        
        return isValid;
    }

    // Cargar email recordado si existe
    if (localStorage.getItem('rememberedEmail')) {
        emailInput.value = localStorage.getItem('rememberedEmail');
        rememberCheckbox.checked = true;
    }

    // Manejar envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const email = emailInput.value.trim();
            saveSession(email, rememberCheckbox.checked);
            showAlert('¡Inicio de sesión exitoso!', false);
            setTimeout(redirectToHome, 1000);
        }
    });

    // Validación en tiempo real para el email
    emailInput.addEventListener('input', function() {
        const emailValue = this.value.trim();
        if (emailValue && !isValidEmail(emailValue)) {
            this.classList.add('is-invalid');
            this.nextElementSibling.textContent = 'El email debe contener @';
        } else {
            this.classList.remove('is-invalid');
        }
    });

    // Limpiar validación de contraseña al escribir
    passwordInput.addEventListener('input', function() {
        if (this.value.trim()) {
            this.classList.remove('is-invalid');
        }
    });

    // Manejar "olvidé mi contraseña"
    document.getElementById('forgotPassword').addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Ingrese su email para recuperar contraseña:');
        if (email) {
            if (!isValidEmail(email)) {
                alert('Por favor ingrese un email válido con @');
            } else {
                showAlert(`Se ha enviado un enlace de recuperación a ${email}`, false);
            }
        }
    });
});
