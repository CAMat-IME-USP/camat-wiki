document.addEventListener('DOMContentLoaded', function () {

    const browser = bowser.getParser(window.navigator.userAgent);
    const browserName = browser.getBrowserName();  // Nome do navegador
    // Coleta informações sobre o navegador e sistema operacional
    const userAgent = navigator.userAgent;
    const os = navigator.platform;

    // Cria um identificador único para a sessão do usuário (usando localStorage)
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'sessao-' + Math.random().toString(36).substr(2, 9); // Gerando um ID único
        localStorage.setItem('sessionId', sessionId); // Armazenando no localStorage
    }

    // Pega o post_id da URL
    const path = window.location.pathname;
    const pageId = path.substring(path.lastIndexOf('/') + 1); // Supondo que o post_id seja a última parte da URL

    // Faz uma requisição para registrar o acesso
    fetch('http://camat.ime.usp.br/registrar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Enviando os dados como formulário
        },
        body: new URLSearchParams({
            page_id: pageId,
            session_id: sessionId,
            browser: browserName,
            user_agent: userAgent,
            os: os
        })
    })
        .then(response => response.text())
        .then(data => console.log('Acesso registrado:', data))
        .catch(error => console.error('Erro ao registrar o acesso:', error));
});