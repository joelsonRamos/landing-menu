document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitButton");
    const statusMessage = document.getElementById("statusMessage");

    // Inicializar o EmailJS
    emailjs.init("TXPJ_3uAxe0tn09aF"); // Substitua com seu User ID do EmailJS

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        submitButton.innerText = "Enviando...";
        submitButton.disabled = true;
        statusMessage.style.display = "none"; // Esconde qualquer mensagem anterior

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            plan: document.getElementById("plan").value,
            message: document.getElementById("message").value,
        };

        // Enviar o e-mail usando o EmailJS
        try {
            const response = await emailjs.send("service_6h3yd7m", "template_ltu9h9f", formData);
            console.log('Success:', response);

            // Exibe a mensagem de sucesso
            statusMessage.innerHTML = "Mensagem enviada com sucesso!";
            statusMessage.classList.add("text-success");
            statusMessage.classList.remove("text-danger");
            statusMessage.style.display = "block";

            // Exibe o toast de sucesso
            const toast = new bootstrap.Toast(document.getElementById("successToast"));
            toast.show();

            // Após 3 segundos, faz o reload da página
            setTimeout(function () {
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error('Error:', error);

            // Exibe a mensagem de erro
            statusMessage.innerHTML = "Não foi possível enviar a mensagem. Tente novamente.";
            statusMessage.classList.add("text-danger");
            statusMessage.classList.remove("text-success");
            statusMessage.style.display = "block";
        } finally {
            submitButton.innerText = "Enviar";
            submitButton.disabled = false;
            form.reset();
        }
    });
});
