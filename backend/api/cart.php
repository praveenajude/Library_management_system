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

// Get cart ID if present
$cart_id = null;
if (isset($_GET['id'])) {
    $cart_id = $_GET['id'];
} else {
    // Try to extract from path
    $last_part = end($path_parts);
    if ($last_part && $last_part !== 'cart.php' && is_numeric($last_part) === false) {
        $cart_id = $last_part;
    }
}

try {
switch ($method) {
    case 'GET':
        if ($cart_id) {
            $stmt = $pdo->prepare("SELECT * FROM cart WHERE id = ?");
            $stmt->execute([$cart_id]);
            $item = $stmt->fetch();
            
            if ($item) {
                $item['cartauthors'] = json_decode($item['cartauthors'], true) ?? [];
                echo json_encode($item);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Cart item not found']);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM cart ORDER BY id");
            $cart = $stmt->fetchAll();
            
            foreach ($cart as &$item) {
                $item['cartauthors'] = json_decode($item['cartauthors'], true) ?? [];
            }
            
            echo json_encode($cart);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            break;
        }
        
        try {
            $id = uniqid();
            $authors_json = json_encode($data['cartauthors'] ?? []);
            
            $stmt = $pdo->prepare("INSERT INTO cart (id, cartid, carttitle, cartimage, cartauthors) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $id,
                $data['cartid'] ?? '',
                $data['carttitle'] ?? '',
                $data['cartimage'] ?? null,
                $authors_json
            ]);
            
            http_response_code(201);
            echo json_encode(['id' => $id, 'message' => 'Item added to cart']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        if ($cart_id) {
            try {
                $stmt = $pdo->prepare("DELETE FROM cart WHERE id = ?");
                $stmt->execute([$cart_id]);
                
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['message' => 'Item removed from cart']);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Cart item not found']);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Cart ID required']);
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

