# PHP Backend API for Bookstore Application

This backend provides RESTful API endpoints for the React bookstore application using PHP and MySQL.

## Setup Instructions

### 1. Database Setup

1. Make sure MySQL is running on your system (XAMPP, WAMP, or standalone MySQL)

2. Create the database and tables by running the SQL schema:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   
   Or manually:
   - Open MySQL command line or phpMyAdmin
   - Run the SQL commands from `database/schema.sql`

### 2. Configure Database Connection

Edit `config/database.php` and update these values if needed:
```php
$host = 'localhost';
$dbname = 'bookstore';
$username = 'root';      // Change if different
$password = '';          // Change if you have a password
```

### 3. Import Existing Data (Optional)

If you want to import data from the JSON file:
```bash
php database/migrate.php
```

Or run it via browser:
```
http://localhost/backend/database/migrate.php
```

### 4. Server Setup

#### Option A: XAMPP/WAMP
1. Copy the `backend` folder to your web server directory:
   - XAMPP: `C:\xampp\htdocs\backend`
   - WAMP: `C:\wamp64\www\backend`
2. Access API via: `http://localhost/backend/api/books.php`

#### Option B: PHP Built-in Server
```bash
cd backend
php -S localhost:8000
```
Access API via: `http://localhost:8000/api/books.php`

### 5. Update React App Configuration

Edit `src/config/api.js` and update the API base URL:
```javascript
// For XAMPP/WAMP
const API_BASE_URL = 'http://localhost/backend/api';

// For PHP built-in server
const API_BASE_URL = 'http://localhost:8000/api';
```

## API Endpoints

### Books
- `GET /api/books.php` - Get all books
- `GET /api/books.php?id={id}` - Get single book
- `POST /api/books.php` - Add new book
- `DELETE /api/books.php?id={id}` - Delete book

### Users
- `GET /api/users.php` - Get all users
- `GET /api/users.php?id={id}` - Get single user
- `POST /api/users.php` - Add new user
- `DELETE /api/users.php?id={id}` - Delete user

### Cart
- `GET /api/cart.php` - Get all cart items
- `GET /api/cart.php?id={id}` - Get single cart item
- `POST /api/cart.php` - Add item to cart
- `DELETE /api/cart.php?id={id}` - Remove item from cart

## CORS Configuration

The backend is configured to allow requests from `http://localhost:3000` (React dev server). If your React app runs on a different port, update the CORS headers in `config/database.php`:

```php
header('Access-Control-Allow-Origin: http://localhost:YOUR_PORT');
```

## Troubleshooting

1. **Database Connection Error**
   - Check MySQL is running
   - Verify database credentials in `config/database.php`
   - Ensure database `bookstore` exists

2. **CORS Errors**
   - Make sure CORS headers are set correctly
   - Check React app URL matches the allowed origin

3. **404 Errors**
   - Verify PHP files are in correct location
   - Check web server is running
   - Verify URL paths match your server setup

4. **Data Not Showing**
   - Run the migration script to import data
   - Check database tables have data
   - Verify API endpoints return JSON correctly

## File Structure

```
backend/
├── config/
│   └── database.php          # Database configuration
├── api/
│   ├── books.php             # Books API endpoints
│   ├── users.php             # Users API endpoints
│   └── cart.php              # Cart API endpoints
├── database/
│   ├── schema.sql            # Database schema
│   └── migrate.php           # Data migration script
├── .htaccess                 # Apache configuration
└── README.md                 # This file
```

