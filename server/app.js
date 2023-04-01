const express = require('express');

const app = express();

const taskGroupRoutes = require('./routes/task_group');

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// app.use('/static', express.static('static'));

app.use(taskGroupRoutes);

app.listen(8080);