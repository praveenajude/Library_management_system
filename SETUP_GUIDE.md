# PHP Backend Setup Guide

This guide will help you set up the PHP backend with MySQL for your React bookstore application.

## Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher (or MariaDB)
- Web server (XAMPP, WAMP, or PHP built-in server)
- React app already set up

## Step-by-Step Setup

### 1. Database Setup

#### Option A: Using MySQL Command Line
```bash
mysql -u root -p
```
Then run:
```sql
source backend/database/schema.sql
```

#### Option B: Using phpMyAdmin
1. Open phpMyAdmin (usually at `http://localhost/phpmyadmin`)
2. Click "New" to create a database
3. Name it `bookstore`
4. Click "Import" tab
5. Select `backend/database/schema.sql`
6. Click "Go"

### 2. Configure Database Connection

Edit `backend/config/database.php` and update if your MySQL credentials are different:

```php
$host = 'localhost';        // Usually 'localhost'
$dbname = 'bookstore';      // Database name
$username = 'root';         // Your MySQL username
$password = '';             // Your MySQL password (empty for XAMPP default)
```

### 3. Set Up PHP Backend

#### Option A: XAMPP (Windows)
1. Copy the `backend` folder to `C:\xampp\htdocs\backend`
2. Start Apache and MySQL from XAMPP Control Panel
3. Access API at: `http://localhost/backend/api/books.php`

#### Option B: WAMP (Windows)
1. Copy the `backend` folder to `C:\wamp64\www\backend`
2. Start WAMP services
3. Access API at: `http://localhost/backend/api/books.php`

#### Option C: PHP Built-in Server
```bash
cd backend
php -S localhost:8000
```
Access API at: `http://localhost:8000/api/books.php`

### 4. Import Existing Data

Run the migration script to import data from `src/Data/data.json`:

#### Option A: Command Line
```bash
cd backend
php database/migrate.php
```

#### Option B: Browser
Open: `http://localhost/backend/database/migrate.php`

You should see output like:
```
Starting migration...
Importing books...
Imported 200 books
Importing users...
Imported 5 users
Importing cart items...
Imported 2 cart items
Migration completed!
```

### 5. Update React App Configuration

Edit `src/config/api.js` and set the correct API URL:

**For XAMPP/WAMP:**
```javascript
const API_BASE_URL = 'http://localhost/backend/api';
```

**For PHP Built-in Server:**
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

**For Custom Setup:**
```javascript
const API_BASE_URL = 'http://your-domain/backend/api';
```

### 6. Test the Setup

1. Start your React app:
   ```bash
   npm start
   ```

2. Test API endpoints directly:
   - Books: `http://localhost/backend/api/books.php`
   - Users: `http://localhost/backend/api/users.php`
   - Cart: `http://localhost/backend/api/cart.php`

3. Test in React app:
   - Login as admin: `admin@gmail.com` / `admin123`
   - Login as user: `user@gmail.com` / `user123`
   - Try browsing books, adding to cart, etc.

## Troubleshooting

### Database Connection Error
**Error:** "Database connection failed"

**Solutions:**
- Check MySQL is running
- Verify credentials in `backend/config/database.php`
- Ensure database `bookstore` exists
- Check MySQL port (default: 3306)

### CORS Errors
**Error:** "Access to fetch at ... has been blocked by CORS policy"

**Solutions:**
- Check `backend/config/database.php` has correct CORS headers
- Verify React app URL matches allowed origin
- For React app on different port, update:
  ```php
  header('Access-Control-Allow-Origin: http://localhost:YOUR_PORT');
  ```

### 404 Not Found
**Error:** "Failed to fetch" or 404 errors

**Solutions:**
- Verify PHP files are in correct location
- Check web server is running
- Verify URL paths match your setup
- Check `.htaccess` file exists (for Apache)

### Data Not Showing
**Problem:** Books/users not appearing

**Solutions:**
- Run migration script: `php backend/database/migrate.php`
- Check database has data: `SELECT COUNT(*) FROM books;`
- Verify API returns JSON: Visit API URL in browser
- Check browser console for errors

### PHP Errors
**Error:** PHP syntax errors or warnings

**Solutions:**
- Check PHP version: `php -v` (need 7.4+)
- Enable error display in `php.ini`:
  ```ini
  display_errors = On
  error_reporting = E_ALL
  ```
- Check PHP error logs

## File Structure

```
project_2/
├── backend/
│   ├── config/
│   │   └── database.php          # Database config
│   ├── api/
│   │   ├── books.php             # Books API
│   │   ├── users.php             # Users API
│   │   └── cart.php              # Cart API
│   ├── database/
│   │   ├── schema.sql            # Database schema
│   │   └── migrate.php           # Data migration
│   ├── .htaccess                 # Apache config
│   └── README.md                  # Backend docs
├── src/
│   ├── config/
│   │   └── api.js                # API base URL config
│   └── ...                       # React components
└── SETUP_GUIDE.md                # This file
```

## API Endpoints Reference

### Books
- `GET /api/books.php` - Get all books
- `GET /api/books.php?id=5` - Get book with ID 5
- `POST /api/books.php` - Add new book
- `DELETE /api/books.php?id=5` - Delete book with ID 5

### Users
- `GET /api/users.php` - Get all users
- `GET /api/users.php?id=user1` - Get user with ID
- `POST /api/users.php` - Add new user
- `DELETE /api/users.php?id=user1` - Delete user

### Cart
- `GET /api/cart.php` - Get all cart items
- `GET /api/cart.php?id=cart1` - Get cart item
- `POST /api/cart.php` - Add to cart
- `DELETE /api/cart.php?id=cart1` - Remove from cart

## Next Steps

After setup is complete:
1. Test all CRUD operations
2. Verify data persistence
3. Check error handling
4. Consider adding authentication tokens
5. Add input validation and sanitization
6. Set up proper error logging

## Support

If you encounter issues:
1. Check error messages in browser console
2. Check PHP error logs
3. Verify database connection
4. Test API endpoints directly in browser
5. Check CORS configuration

