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

// Get book ID if present (assuming URL structure: /backend/api/books.php/5)
$book_id = null;
if (isset($_GET['id'])) {
    $book_id = $_GET['id'];
} else {
    // Try to extract from path
    $last_part = end($path_parts);
    if (is_numeric($last_part)) {
        $book_id = $last_part;
    }
}

try {
switch ($method) {
    case 'GET':
        if ($book_id) {
            // Get single book
            $stmt = $pdo->prepare("SELECT * FROM books WHERE id = ?");
            $stmt->execute([$book_id]);
            $book = $stmt->fetch();
            
            if ($book) {
                // Decode JSON fields
                $book['authors'] = json_decode($book['authors'], true) ?? [];
                $book['categories'] = json_decode($book['categories'], true) ?? [];
                // Format publishedDate if needed
                if ($book['publishedDate']) {
                    $book['publishedDate'] = ['$date' => $book['publishedDate']];
                }
                echo json_encode($book);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Book not found']);
            }
        } else {
            // Get all books
            $stmt = $pdo->query("SELECT * FROM books ORDER BY id");
            $books = $stmt->fetchAll();
            
            // Decode JSON fields for each book
            foreach ($books as &$book) {
                $book['authors'] = json_decode($book['authors'], true) ?? [];
                $book['categories'] = json_decode($book['categories'], true) ?? [];
                // Format publishedDate if needed
                if ($book['publishedDate']) {
                    $book['publishedDate'] = ['$date' => $book['publishedDate']];
                }
            }
            
            echo json_encode($books);
        }
        break;
        
    case 'POST':
        // Add new book
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            break;
        }
        
        try {
            // Generate ID if not provided
            $book_id = isset($data['id']) ? $data['id'] : uniqid();
            
            $stmt = $pdo->prepare("INSERT INTO books (id, title, isbn, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors, categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            
            $authors_json = json_encode($data['authors'] ?? []);
            $categories_json = json_encode($data['categories'] ?? []);
            
            // Handle publishedDate format
            $published_date = null;
            if (isset($data['publishedDate'])) {
                if (is_array($data['publishedDate']) && isset($data['publishedDate']['$date'])) {
                    $published_date = date('Y-m-d H:i:s', strtotime($data['publishedDate']['$date']));
                } else {
                    $published_date = date('Y-m-d H:i:s', strtotime($data['publishedDate']));
                }
            }
            
            $stmt->execute([
                $book_id,
                $data['title'] ?? '',
                $data['isbn'] ?? null,
                $data['pageCount'] ?? null,
                $published_date,
                $data['thumbnailUrl'] ?? null,
                $data['shortDescription'] ?? null,
                $data['longDescription'] ?? null,
                $data['status'] ?? 'PUBLISH',
                $authors_json,
                $categories_json
            ]);
            
            http_response_code(201);
            echo json_encode(['id' => $book_id, 'message' => 'Book added successfully']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        if ($book_id) {
            try {
                $stmt = $pdo->prepare("DELETE FROM books WHERE id = ?");
                $stmt->execute([$book_id]);
                
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['message' => 'Book deleted successfully']);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Book not found']);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Book ID required']);
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

