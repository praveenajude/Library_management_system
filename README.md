# Library_management_system

This repository contains the Library Management System project.

## Notes

- The project was developed with Create React App for the frontend and PHP for the backend API.
- Use the example config files in `backend/config/database.example.php` and `src/config/api.example.js` as templates. Copy them to `backend/config/database.php` and `src/config/api.js` respectively and fill in your environment-specific values.

## Getting Started (frontend)

In the `src` directory you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `build` folder.

## Backend

The backend PHP API is in the `backend/api` directory. Configure your database connection in `backend/config/database.php` (use `backend/config/database.example.php` as a template).

For deployment, ensure you do not commit files containing credentials; keep the real config files out of the repository and commit only example templates.

