<?php
// Handle OPTIONS preflight request FIRST, before any other code
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');
    http_response_code(200);
    exit();
}

// Start output buffering to prevent any accidental output before headers
ob_start();

// Ensure CORS headers for this API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

try {
    require_once '../config/database.php';
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to initialize: ' . $e->getMessage()]);
    ob_end_flush();
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

// Get user ID if present
$user_id = null;
if (isset($_GET['id'])) {
    $user_id = $_GET['id'];
} else {
    // Try to extract from path
    $last_part = end($path_parts);
    if ($last_part && $last_part !== 'users.php') {
        $user_id = $last_part;
    }
}

try {
switch ($method) {
    case 'GET':
        if ($user_id) {
            $stmt = $pdo->prepare("SELECT id, firstName, lastName, email, phone, address, birthDate FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            $user = $stmt->fetch();
            
            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
            }
        } else {
            $stmt = $pdo->query("SELECT id, firstName, lastName, email, phone, address, birthDate FROM users ORDER BY id");
            $users = $stmt->fetchAll();
            echo json_encode($users);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            break;
        }
        // Validate required fields
        $firstName = trim($data['firstName'] ?? '');
        $lastName = trim($data['lastName'] ?? '');
        $email = trim($data['email'] ?? '');

        if ($firstName === '' || $lastName === '' || $email === '') {
            http_response_code(400);
            echo json_encode(['error' => 'firstName, lastName and email are required']);
            break;
        }

        try {
            // Check duplicate email
            $check = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
            $check->execute([$email]);
            if ($check->fetch()) {
                http_response_code(409);
                echo json_encode(['error' => 'Email already exists']);
                break;
            }

            // Generate unique ID
            $id = uniqid();

            $stmt = $pdo->prepare("INSERT INTO users (id, firstName, lastName, email, phone, address, birthDate) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $id,
                $firstName,
                $lastName,
                $email,
                $data['phone'] ?? null,
                $data['address'] ?? null,
                $data['birthDate'] ?? null
            ]);

            http_response_code(201);
            echo json_encode(['id' => $id, 'message' => 'User added successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        if ($user_id) {
            try {
                $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
                $stmt->execute([$user_id]);
                
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['message' => 'User deleted successfully']);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'User not found']);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'User ID required']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

// Flush output buffer
ob_end_flush();
?>

