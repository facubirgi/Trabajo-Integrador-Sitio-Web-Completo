document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const campos = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        asunto: document.getElementById('asunto'),
        mensaje: document.getElementById('mensaje'),
        terminos: document.getElementById('terminos'),
        tipoUsuario: document.querySelectorAll('input[name="tipoUsuario"]')
    };

    // Expresiones regulares para validación
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^[0-9]{9,15}$/;

    // Validar en tiempo real
    campos.nombre.addEventListener('input', () => validarCampo(campos.nombre, campos.nombre.value.trim() !== '', 'nombreError'));
    campos.email.addEventListener('input', () => validarCampo(campos.email, regexEmail.test(campos.email.value), 'emailError'));
    campos.telefono.addEventListener('input', () => {
        const valido = campos.telefono.value === '' || regexTelefono.test(campos.telefono.value);
        validarCampo(campos.telefono, valido, 'telefonoError');
    });
    campos.asunto.addEventListener('change', () => validarCampo(campos.asunto, campos.asunto.value !== '', 'asuntoError'));
    campos.mensaje.addEventListener('input', () => validarCampo(campos.mensaje, campos.mensaje.value.trim().length >= 10, 'mensajeError'));
    campos.terminos.addEventListener('change', () => validarCampo(campos.terminos, campos.terminos.checked, 'terminosError'));
    campos.tipoUsuario.forEach(radio => {
        radio.addEventListener('change', () => {
            const seleccionado = document.querySelector('input[name="tipoUsuario"]:checked');
            validarCampo(radio, seleccionado !== null, 'tipoUsuarioError');
        });
    });

    // Función para validar un campo
    function validarCampo(campo, condicion, errorId) {
        const errorElement = document.getElementById(errorId);
        if (condicion) {
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
            errorElement.style.display = 'none';
        } else {
            campo.classList.remove('is-valid');
            campo.classList.add('is-invalid');
            errorElement.style.display = 'block';
        }
    }

    // Validar al enviar el formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formularioValido = true;

        // Validar cada campo
        if (campos.nombre.value.trim() === '') {
            validarCampo(campos.nombre, false, 'nombreError');
            formularioValido = false;
        }
        if (!regexEmail.test(campos.email.value)) {
            validarCampo(campos.email, false, 'emailError');
            formularioValido = false;
        }
        if (campos.telefono.value && !regexTelefono.test(campos.telefono.value)) {
            validarCampo(campos.telefono, false, 'telefonoError');
            formularioValido = false;
        }
        if (campos.asunto.value === '') {
            validarCampo(campos.asunto, false, 'asuntoError');
            formularioValido = false;
        }
        if (campos.mensaje.value.trim().length < 10) {
            validarCampo(campos.mensaje, false, 'mensajeError');
            formularioValido = false;
        }
        if (!campos.terminos.checked) {
            validarCampo(campos.terminos, false, 'terminosError');
            formularioValido = false;
        }
        if (!document.querySelector('input[name="tipoUsuario"]:checked')) {
            validarCampo(campos.tipoUsuario[0], false, 'tipoUsuarioError');
            formularioValido = false;
        }

        // Si todo es válido
        if (formularioValido) {
            // Simular envío (en un proyecto real, usar fetch() a un backend)
            alert('¡Formulario enviado con éxito! Nos contactaremos pronto.');
            form.reset();
            // Limpiar clases de validación
            document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
        } else {
            // Desplazarse al primer error
            const primerError = document.querySelector('.is-invalid');
            if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});