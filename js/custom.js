document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    var navbarCollapse = document.querySelector('#navbarSupportedContent');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.getComputedStyle(navbarCollapse).display !== 'none') {
                var bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    var backToTopButton = document.querySelector('.back-to-top');

    // Função para mostrar ou ocultar o botão
    function toggleBackToTopButton() {
        if (window.scrollY > 300) { // Ajuste o valor conforme necessário
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }

    // Adicionar ouvinte de evento para rolar
    window.addEventListener('scroll', toggleBackToTopButton);

    // Adicionar clique no botão para rolar suavemente para o topo
    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});

function selectAndScroll(plan) {
    // Define a opção selecionada no campo select
    var selectElement = document.getElementById('plan');
    selectElement.value = plan;

    // Rola para a seção de contato
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const establishmentInput = document.getElementById('establishment');
    const cityInput = document.getElementById('city');
    const customCityInput = document.getElementById('customCity');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const planSelect = document.getElementById('plan');

    // Adicionar ouvinte de clique ao botão de envio
    document.getElementById('submitButton').addEventListener('click', function (event) {
        console.log('Botão de envio clicado');
        let isValid = true;

        // Validação do Nome
        if (nameInput.value.trim() === '') {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('name-error').style.display = 'none';
        }

        // Validação do Estabelecimento
        if (establishmentInput.value.trim() === '') {
            document.getElementById('establishment-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('establishment-error').style.display = 'none';
        }

         // Validação da cidade
         if (cityInput.value.trim() === '') {
            document.getElementById('city-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('city-error').style.display = 'none';
        }

        // Se for "Outra (especificar)", verificar se foi digitado algo
        if (cityInput.value === "other" && customCityInput.value.trim() === "") {
            document.getElementById('customCity-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('customCity-error').style.display = 'none';
        }

        // Validação do Email
        if (emailInput.value.trim() === '' || !emailInput.validity.valid) {
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('email-error').style.display = 'none';
        }

        // Validação do phone
        if (phoneInput.value.trim() === '' || !phoneInput.validity.valid) {
            document.getElementById('phone-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('phone-error').style.display = 'none';
        }

        // Validação do Plano
        if (planSelect.value === '') {
            document.getElementById('plan-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('plan-error').style.display = 'none';
        }

        // Se algum campo não for válido, previne o envio do formulário
        if (!isValid) {
            event.preventDefault(); // Impede o envio do formulário se não for válido
        }
    });

    var contactModal = document.getElementById('contactModal');
    var closeButton = contactModal.querySelector('.custom-btn-close');
    var closeButtonUm = contactModal.querySelector('.custom-btn-close-um');
    var contactForm = document.getElementById('contactForm');
    var errorMessages = contactForm.querySelectorAll('.text-danger');

    closeButton.addEventListener('click', function () {
        // Limpar campos do formulário
        contactForm.reset();

        // Ocultar mensagens de erro
        errorMessages.forEach(function (msg) {
            msg.style.display = 'none';
        });
    });
    closeButtonUm.addEventListener('click', function () {
        // Limpar campos do formulário
        contactForm.reset();

        // Ocultar mensagens de erro
        errorMessages.forEach(function (msg) {
            msg.style.display = 'none';
        });
    });
});


const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Adiciona um event listener a cada link
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove a classe 'active' de todos os links
        navLinks.forEach(link => link.classList.remove('active'));

        // Adiciona a classe 'active' ao link clicado
        this.classList.add('active');
    });
});


$(document).ready(function () {
    $('#city').select2({
        placeholder: "Pesquise ou selecione uma cidade",
        allowClear: true
    });
});

function toggleCityInput() {
    const citySelect = document.getElementById("city");
    const customCityContainer = document.getElementById("customCityContainer");
    const customCityInput = document.getElementById("customCity");

    if (citySelect.value === "other") {
        customCityContainer.style.display = "block";
        customCityInput.required = true;
    } else {
        customCityContainer.style.display = "none";
        customCityInput.required = false;
        customCityInput.value = "";
    }
}