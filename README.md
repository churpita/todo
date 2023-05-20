# To-Do Web Application
A simple CRUD web application to assist in managing and grouping to-do tasks.

![Prototype application design](prototype_image.png)

# Planned Feature Backlog
### Tasks
- Update task titles/descriptions
- Deadlines/desktop reminders for tasks
- Delete tasks
### General
- Switch task reducer to utilize Redux
- Switch client to utilize TypeScript
- Re-ordering for tasks and task groups
- Real time updates
- User authentication system
- Dockerize the Node server

# Local Configuration
To run this application on your local machine, 

1. Install Docker, and navigate within a CLI to **`server\`**. Run **`docker build -t todo:0.1 .`** to build the database docker image, and then **`docker run -d -p 3306:3306 todo:0.1`** to start the image on port 3306. This image's configuration is only for the sake of development, and should be reconsidered for any production deployment in the interest of security. Future updates will also include a combined MySQL and Node image to remove the next step. 

2. At **`server\`**, run `npm install`, and then `npm start` to start the server. By default, the server will run on port 8080. This can be adjusted if necessary within **`server\app.js`** at the `app.listen(8080)` call. However, do note that any changes must also be made within **`client\.env`**

3. At **`client\`**, run `npm install` and then `npm start` to start the application. Alternatively, `npm build` can be used to compile the React code. 

# Tech Stack
- Node (Express)
- Docker
- MySQL
- React.js
