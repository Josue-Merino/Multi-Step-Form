document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const main = document.querySelector('#mainTag');
    const inputName = document.querySelector('#name');
    const inputEmail = document.querySelector('#email');
    const button = document.querySelector('.form__button');
    const firstForm = document.querySelector('#form');

    const register = {
        name: '',
        email: '',
        topic: []
    };

    // Validar formulario
    inputName?.addEventListener('blur', validate);
    inputEmail?.addEventListener('blur', validate);

    // Enviar formulario inicial
    firstForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        firstForm.remove();
        secondStepForm();
        console.log(register);
    });

    // Función de validación
    function validate(e) {
        if (!e.target) return; // Asegurar que el evento tiene un target válido

        if (e.target.value === '') {
            errorMessage('This field cannot be empty', e.target.id, e.target.parentElement);
            register[e.target.name] = '';
            testFirstRegister();
            return;
        }

        if (e.target.id === 'email' && !validateEmail(e.target.value)) {
            errorMessage('The email is not valid', e.target.id, e.target.parentElement);
            register[e.target.name] = '';
            testFirstRegister();
            return;
        }

        cleanAlert(e.target.parentElement);
        register[e.target.name] = e.target.value;
        testFirstRegister();
    }

    // Mostrar mensaje de error
    function errorMessage(message, id, inputContainer) {
        cleanAlert(inputContainer);

        const alert = document.createElement('P');
        alert.textContent = message;
        alert.classList.add('errorMessage');
        inputContainer.appendChild(alert);
    }

    // Limpiar alertas
    function cleanAlert(inputContainer) {
        const existAlert = inputContainer?.querySelector('.errorMessage');
        if (existAlert) {
            existAlert.remove();
        }
    }

    // Validar email
    function validateEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    // Validar registro inicial
    function testFirstRegister() {
        if (Object.values(register).includes('')) {
            if (button) {
                button.style.opacity = '.5';
                button.disabled = true;
            }
            return;
        }

        if (button) {
            button.style.opacity = '1';
            button.disabled = false;
        }
    }

    // Crear segundo formulario
    function secondStepForm() {
        const secondForm = document.createElement('FORM');
        secondForm.classList.add('form');
        secondForm.id = 'form2';
        secondForm.innerHTML = `
            <h1 class="form__tittle">Which topics are you interested in?</h1>
            <button class="option" id="SW" value="Software Development">Software Development</button>
            <button class="option" id="UX" value="User Experience">User Experience</button>
            <button class="option" id="GD" value="Graphic Design">Graphic Design</button>
            <button class="form__button" id="secondButton" disabled>Continue</button>
        `;

        main?.appendChild(secondForm);

        const SW = document.querySelector('#SW');
        const UX = document.querySelector('#UX');
        const GD = document.querySelector('#GD');
        const secondButton = document.querySelector('#secondButton');

        SW?.addEventListener('click', chooseValue);
        UX?.addEventListener('click', chooseValue);
        GD?.addEventListener('click', chooseValue);

        // Elegir valor de tópico
        function chooseValue(e) {
            e.preventDefault();
            let topicAdded;

            if (e.target.value === 'Software Development') {
                topicAdded = register.topic.push(e.target.value);
                eliminateRepetitionTopic();
                SW.style.background = '#652CD1';
                SW.style.color = '#E5E7EB';
                verifyTopicAdded();
                return;
            }

            if (e.target.value === 'User Experience') {
                topicAdded = register.topic.push(e.target.value);
                eliminateRepetitionTopic();
                UX.style.background = '#652CD1';
                UX.style.color = '#E5E7EB';
                verifyTopicAdded();
                return;
            }

            if (e.target.value === 'Graphic Design') {
                topicAdded = register.topic.push(e.target.value);
                eliminateRepetitionTopic();
                GD.style.background = '#652CD1';
                GD.style.color = '#E5E7EB';
                verifyTopicAdded();
                return;
            }
        }

        // Verificar si hay tópicos seleccionados
        function verifyTopicAdded() {
            const topic = register.topic;
            if (topic.length > 0 && secondButton) {
                secondButton.disabled = false;
                secondButton.style.opacity = '1';
            }
        }

        // Eliminar tópicos repetidos
        function eliminateRepetitionTopic() {
            let list = new Set(register.topic);
            register.topic = Array.from(list);
        }

        // Enviar segundo formulario
        secondForm.addEventListener('submit', (e) => {
            e.preventDefault();
            secondForm.remove();
            generateSummary();
            
        });
    }

    // Generar resumen
    function generateSummary() {
        const summaryContainer = document.createElement('DIV');
        summaryContainer.classList.add('results');

        const { name, email, topic } = register;
        summaryContainer.innerHTML = `
            <h1 class="results__tittle">Summary</h1>
            <p class="results__info">Name:<span class="results__text"> ${name}</span></p>
            <p class="results__info">Email:<span class="results__text"> ${email}</span></p>
            <p class="results__info topic">Topics:</p>
            <ul id="list-topics"></ul>
            <button class="form__button--confirm" id="confirm">Confirm</button>
        `;

        main?.appendChild(summaryContainer);

        const ulTag = document.querySelector('#list-topics');
        if (ulTag) {
            topic.forEach(element => {
                const list = document.createElement('LI');
                list.classList.add('results__text');
                list.textContent = element;
                ulTag.appendChild(list);
            });
        }

        const confirm = document.querySelector('#confirm');
        confirm.addEventListener('click' ,e => {
            e.preventDefault();


            summaryContainer.remove();
            succesAlert()

        })

        function succesAlert () {
            const succesAlert = document.createElement('DIV');
            succesAlert.classList.add('success')
            const succesText = document.createElement('P');
            succesText.textContent = 'Success!!'
            succesAlert.appendChild(succesText);
            const succesIcon = document.createElement('img');
            succesIcon.src = './images/icon.svg'
            succesAlert.appendChild(succesIcon);
            main.appendChild(succesAlert)
            
            

        }
    }
});
