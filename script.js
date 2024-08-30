document.addEventListener('DOMContentLoaded',function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    const confirmPassInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide');

    loginForm.addEventListener('submit', function(event){
        event.preventDefault();
        validateForm();
    })

    emailInput.addEventListener('blur',function() {
        //todo: agregar metodo que valida el mail
        validateEmail();
    })

    emailInput.addEventListener('change',function() {
        clearError(emailError);
    })

    passInput.addEventListener('change',function() {
        clearError(passError);
    })

    confirmPassInput.addEventListener('change',function() {
        clearError(confirmError);
    })

    showHideButton.addEventListener('click',function () {
        if(passInput.type=='password'){
            passInput.type='text';
            confirmPassInput.type='text';
        } else {
            passInput.type='password';
            confirmPassInput.type='password';
        }
    })

    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPass = validatePassword();
        const isValidConfirm = validarPasswordMatch();

        if(isValidEmail && isValidPass && isValidConfirm){
            saveToLocalStorage();
            alert('has ingresado con exito');
        }

    }
    
    function validateEmail() {
        const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const emailValue = emailInput.value.trim();

        if (!emailRegex.test(emailValue)) {
            showError(emailError,'Ingrese un mail valido');
            return false;
        }

        return true;
    }

    function validatePassword() {
        const passwordValue = passInput.value.trim();
        console.log(passInput.value.length);

        if(passwordValue.length < 6){
            showError(passError,'Ingrese una contraseña de al menos 6 caracteres');
            return false;
        }

        return true;
    }

    function validarPasswordMatch() {
        const passwordValue = passInput.value.trim();
        const confirmPassValue = confirmPassInput.value.trim();

        if(passwordValue!=confirmPassValue){
            showError(confirmError,'Las password deben coincidir');
            return false;
        }

        return true;
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email',emailValue);
        const body = createBuilderJSON();
        console.log(body);
    }

    function createBuilderJSON() {
        return {
            "email":emailInput.value,
            "password":passInput.value
        }
    }
})