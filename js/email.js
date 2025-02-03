form.addEventListener("submit", async function (event) {
    event.preventDefault();
    submitButton.innerText = "Enviando...";
    submitButton.disabled = true;

    const formData = {
        name: document.getElementById("name").value,
        establishment: document.getElementById("establishment").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        plan: document.getElementById("plan").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            statusMessage.innerHTML = "Mensagem enviada com sucesso!";
            statusMessage.classList.add("text-success");
            statusMessage.classList.remove("text-danger");
            statusMessage.style.display = "block";

            const toast = new bootstrap.Toast(document.getElementById("successToast"));
            toast.show();

            setTimeout(() => window.location.reload(), 3000);
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        statusMessage.innerHTML = "Não foi possível enviar a mensagem. Tente novamente.";
        statusMessage.classList.add("text-danger");
        statusMessage.classList.remove("text-success");
        statusMessage.style.display = "block";
    } finally {
        submitButton.innerText = "Enviar";
        submitButton.disabled = false;
    }
});