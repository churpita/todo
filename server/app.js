const express = require('express');

const app = express();

app.use(express.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

const taskGroupRoutes = require('./routes/task_group');

// app.use('/static', express.static('static'));

app.use(taskGroupRoutes);

app.listen(8080);