<?php
/**
 * Migration script to import data from JSON file to MySQL database
 * Run this script once after setting up the database schema
 * Usage: php migrate.php
 */

require_once '../config/database.php';

// Path to the JSON data file (adjust path as needed)
$json_file = __DIR__ . '/../../src/Data/data.json';

if (!file_exists($json_file)) {
    die("Error: JSON file not found at $json_file\n");
}

echo "Starting migration...\n";

// Read JSON file
$json_data = file_get_contents($json_file);
$data = json_decode($json_data, true);

if (!$data) {
    die("Error: Failed to parse JSON file\n");
}

// Import Books
if (isset($data['books']) && is_array($data['books'])) {
    echo "Importing books...\n";
    $books_stmt = $pdo->prepare("INSERT INTO books (id, title, isbn, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors, categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), isbn=VALUES(isbn), pageCount=VALUES(pageCount)");
    
    $count = 0;
    foreach ($data['books'] as $book) {
        // Handle publishedDate format
        $published_date = null;
        if (isset($book['publishedDate']['$date'])) {
            $published_date = date('Y-m-d H:i:s', strtotime($book['publishedDate']['$date']));
        } elseif (isset($book['publishedDate'])) {
            $published_date = date('Y-m-d H:i:s', strtotime($book['publishedDate']));
        }
        
        $authors_json = json_encode($book['authors'] ?? []);
        $categories_json = json_encode($book['categories'] ?? []);
        
        try {
            $books_stmt->execute([
                (string)$book['id'], // Ensure ID is string
                $book['title'] ?? '',
                $book['isbn'] ?? null,
                $book['pageCount'] ?? null,
                $published_date,
                $book['thumbnailUrl'] ?? null,
                $book['shortDescription'] ?? null,
                $book['longDescription'] ?? null,
                $book['status'] ?? 'PUBLISH',
                $authors_json,
                $categories_json
            ]);
            $count++;
        } catch (PDOException $e) {
            echo "Error importing book ID {$book['id']}: " . $e->getMessage() . "\n";
        }
    }
    echo "Imported $count books\n";
}

// Import Users
if (isset($data['users']) && is_array($data['users'])) {
    echo "Importing users...\n";
    $users_stmt = $pdo->prepare("INSERT INTO users (id, firstName, lastName, email, phone, address, birthDate) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE email=VALUES(email)");
    
    $count = 0;
    foreach ($data['users'] as $user) {
        try {
            $users_stmt->execute([
                $user['id'],
                $user['firstName'] ?? '',
                $user['lastName'] ?? '',
                $user['email'] ?? '',
                $user['phone'] ?? null,
                $user['address'] ?? null,
                $user['birthDate'] ?? null
            ]);
            $count++;
        } catch (PDOException $e) {
            echo "Error importing user ID {$user['id']}: " . $e->getMessage() . "\n";
        }
    }
    echo "Imported $count users\n";
}

// Import Cart
if (isset($data['cart']) && is_array($data['cart'])) {
    echo "Importing cart items...\n";
    $cart_stmt = $pdo->prepare("INSERT INTO cart (id, cartid, carttitle, cartimage, cartauthors) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE carttitle=VALUES(carttitle)");
    
    $count = 0;
    foreach ($data['cart'] as $item) {
        $authors_json = json_encode($item['cartauthors'] ?? []);
        
        try {
            $cart_stmt->execute([
                $item['id'],
                $item['cartid'] ?? '',
                $item['carttitle'] ?? '',
                $item['cartimage'] ?? null,
                $authors_json
            ]);
            $count++;
        } catch (PDOException $e) {
            echo "Error importing cart item ID {$item['id']}: " . $e->getMessage() . "\n";
        }
    }
    echo "Imported $count cart items\n";
}

echo "Migration completed!\n";
?>

