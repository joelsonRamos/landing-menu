document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitButton");
    const statusMessage = document.getElementById("statusMessage");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        submitButton.innerText = "Enviando...";
        submitButton.disabled = true;
        statusMessage.style.display = "none"; // Esconde qualquer mensagem anterior

        const cityValue = document.getElementById("city").value === "other" ?
                          document.getElementById("customCity").value :
                          document.getElementById("city").value;

        const formData = {
            name: document.getElementById("name").value,
            establishment: document.getElementById("establishment").value,
            city: cityValue, // Agora inclui a cidade personalizada, se necessário
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            plan: document.getElementById("plan").value,
            message: document.getElementById("message").value,
        };

        // Enviar os dados para a API /api/sendEmail.js
        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                console.log('Success:', result);

                // Exibe a mensagem de sucesso
                statusMessage.innerHTML = "Mensagem enviada com sucesso!";
                statusMessage.classList.add("text-success");
                statusMessage.classList.remove("text-danger");
                statusMessage.style.display = "block";

                // Exibe o toast de sucesso
                const toast = new bootstrap.Toast(document.getElementById("successToast"));
                toast.show();

                // Após 3 segundos, recarrega a página
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            } else {
                throw new Error(result.message || 'Erro ao enviar o e-mail.');
            }
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