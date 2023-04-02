# To-Do Web Application
A simple CRUD web application to assist in managing and grouping to-do tasks.

Prototype design (client work in progress):
![Prototype application design](prototype_image.png)

# Local Configuration
To run this application on your local machine, 

1. Install MySQL, and set up an empty schema/database. By default, the server is set up to point to the schema "todo", but if a different schema name must be used, adjustments should be made in **`server\sql\database_reset.bat`** and **`server\util\database.js`**. Additionally, update the SQL credentials within both files to match your own MySQL credentials. For security, please note that this batch file should only be used for local testing, as entering a password via --password can be insecure on some systems. 

2. Run **`server\sql\database_reset.bat`**. Note that this batch file will drop tables and re-create them, so any stored data within the to-do database will be lost with each re-run. This will be fixed at a later point, as I intend to implement ALTER TABLE calls to avoid any data loss. 

3. At **`server\`**, run `npm install`, and then `npm start` to start the server. By default, the server will run on port 8080. This can be adjusted if necessary within **`server\app.js`** at the `app.listen(8080)` call. However, do note that any changes must also be made within **`client\.env`**

4. At **`client\`**, run `npm install` and then `npm start` to start the application. Alternatively, `npm build` can be used to compile the React code. 

# Tech Stack
- Node (Express)
- MySQL
- React.js
