<?php
// Simple test endpoint to verify CORS and API connectivity
ob_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_flush();
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$data = null;

if ($method === 'POST' || $method === 'PUT') {
    $raw_input = file_get_contents('php://input');
    $data = json_decode($raw_input, true);
}

echo json_encode([
    'status' => 'success',
    'message' => 'API is working',
    'method' => $method,
    'received_data' => $data,
    'timestamp' => date('Y-m-d H:i:s')
]);

ob_end_flush();
?>

