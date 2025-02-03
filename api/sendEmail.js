import emailjs from 'emailjs-com';

export default async function handler(req, res) {
    // Configurações CORS (se necessário)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Responde para requisições OPTIONS (pré-verificação CORS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Verifica se o método da requisição é POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    // Desestruturando os dados recebidos
    const { name, establishment, city, email, phone, plan, message } = req.body;

    // Validação simples dos dados (opcional, mas recomendado)
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Campos obrigatórios faltando.' });
    }

    try {
        // Envia o e-mail usando o EmailJS
        const response = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID, // Service ID
            process.env.EMAILJS_TEMPLATE_ID, // Template ID
            { name, establishment, city, email, phone, plan, message }, // Dados para o template
            process.env.EMAILJS_USER_ID // User ID
        );

        // Verifica se o e-mail foi enviado com sucesso
        if (response.status === 200) {
            return res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
        } else {
            return res.status(500).json({ success: false, message: 'Erro ao enviar e-mail.' });
        }
    } catch (error) {
        // Log de erro para ajudar a depurar
        console.error('Erro ao enviar e-mail:', error);

        const errorMessage = error.message || 'Erro desconhecido';
        res.status(500).json({ success: false, message: `Erro ao enviar e-mail: ${errorMessage}` });

        return res.status(500).json({
            success: false,
            message: `Erro ao enviar o e-mail: ${error.message}`,
        });
    }
}

