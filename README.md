# To-Do Web Application

A simple CRUD web application to assist in managing and grouping to-do tasks.

![Prototype application design](prototype_image.png)

# Local Configuration

To run this application on your local machine,

1. Install Docker, and navigate to **`server\`**. Run **`docker-compose up -d --build`** to build and run the server docker image. The configuration in place is only for the sake of development, and should be reconsidered for any production deployment in the interest of security. By default, the API will run on port 8080, and the MySQL server will run on port 3306. These can be adjusted if necessary within **`server\app.js`**, **`server\docker-compose.yml`**, and **`server\Dockerfile`**. Any changes to the API port must also be made within **`client\.env`**. This will be streamlined into .env files in future updates.

2. At **`client\`**, run `npm install` and then `npm run dev` to start the application. Alternatively, `npm build` can be used to compile the React code. If you would like to preview the built code, `npm run preview` can be used to avoid CORS errors that may appear within the built code locally.

# Planned Feature Backlog

### Task Groups

-   Allow re-ordering
-   Add close button
-   Allow drag and drop movement on the modal

### Tasks

-   Allow re-ordering
-   Multi-line description support
-   Deadlines/desktop reminders for tasks

### Users

-   Add user tables
-   Add user authentication
-   Add necessary mapping tables to store permissions
-   Allow multiple users to share task groups
-   Ensure real time updates are provided to users working with shared task groups

### General

-   Switch task reducer to utilize Redux

# Tech Stack

-   Node (Express)
-   Docker
-   MySQL
-   React.js
-   TypeScript
