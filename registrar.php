<?php
if (!isset($_POST['page_id'])) header('Location: https://camat.ime.usp.br');

include('mysql/mysql.php');

// Criando a conexão com o MySQL
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Verificando a conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Pegando os parâmetros da requisição GET
$page_id = isset($_POST['page_id']) ? $_POST['page_id'] : '';
$session_id = isset($_POST['session_id']) ? $_POST['session_id'] : '';
$user_agent = isset($_POST['user_agent']) ? $_POST['user_agent'] : '';
$browser = isset($_POST['browser']) ? $_POST['browser'] : '';
$os = isset($_POST['os']) ? $_POST['os'] : '';

// Verificando se o session_id já registrou um acesso recente para este post
$sql = "SELECT * FROM acesso WHERE page_id = ? AND session_id = ? AND data_acesso > (NOW() - INTERVAL 30 MINUTE)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $page_id, $session_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Já existe um acesso recente com o mesmo session_id para o mesmo post
    echo "Acesso já registrado recentemente!";
} else {
    // Inserindo um novo acesso
    $stmt = $conn->prepare("INSERT INTO acesso (page_id, session_id, user_agent, browser, os, data_acesso) VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("sssss", $page_id, $session_id, $user_agent, $browser, $os);

    if ($stmt->execute()) {
        echo "Acesso registrado com sucesso!";
    } else {
        echo "Erro ao registrar acesso: " . $stmt->error;
    }

    $stmt->close();
}

// Fechando a conexão
$conn->close();
?>