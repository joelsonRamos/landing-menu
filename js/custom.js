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
    const emailInput = document.getElementById('email');
    const planSelect = document.getElementById('plan');
    const messageTextarea = document.getElementById('message');

    // Adicionar ouvinte de clique ao botão de envio
    document.getElementById('submitButton').addEventListener('click', function(event) {
        console.log('Botão de envio clicado');
        let isValid = true;

        // Validação do Nome
        if (nameInput.value.trim() === '') {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('name-error').style.display = 'none';
        }

        // Validação do Email
        if (emailInput.value.trim() === '' || !emailInput.validity.valid) {
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('email-error').style.display = 'none';
        }

        // Validação do Plano
        if (planSelect.value === '') {
            document.getElementById('plan-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('plan-error').style.display = 'none';
        }

        // Validação da Mensagem
        if (messageTextarea.value.trim() === '') {
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('message-error').style.display = 'none';
        }

        // Se algum campo não for válido, previne o envio do formulário
        if (!isValid) {
            event.preventDefault(); // Impede o envio do formulário se não for válido
        }
    });
});

