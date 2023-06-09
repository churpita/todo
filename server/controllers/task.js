const Task = require("../queries/task");

exports.addTask = async (req, res) => {
    try {
        const { task_group_key, task_key, sequence, title, description } =
            req.body;

        if (
            task_group_key == null ||
            task_key == null ||
            sequence == null ||
            title == null
        ) {
            console.log({
                task_group_key: task_group_key,
                task_key: task_key,
                sequence: sequence,
                title: title,
                description: description,
            });
            throw new TypeError(
                "Task group key, task key, sequence, and title must be non-null and present for successful POST"
            );
        }

        const newTaskObj = {
            task_key,
            title,
            description,
        };

        const newMapObj = {
            task_group_key,
            task_key,
            sequence,
        };

        await Task.addTask(newTaskObj);
        await Task.mapTask(newMapObj);
        // need some sort of check/error handling for any use cases where the task is added, but the mapping add fails

        res.status(200).json({
            statusMessage: null,
            content: {
                newTask: {
                    task_group_key,
                    task_key,
                    sequence,
                    title,
                    description,
                },
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            statusMessage: "Sorry, an error has occurred",
            content: null,
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { task_key, title, description } = req.body;

        if (task_key == null || title == null) {
            console.log({
                task_key: task_key,
                title: title,
                description: description,
            });
            throw new TypeError(
                "Task key and title must be non-null and present for successful PUT"
            );
        }

        const updatedTask = {
            task_key,
            title,
            description,
        };

        await Task.updateTask(updatedTask);

        res.status(200).json({
            statusMessage: null,
            content: {
                updatedTask: updatedTask,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            statusMessage: "Sorry, an error has occurred",
            content: null,
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { task_key } = req.body;

        if (task_key == null) {
            console.log({
                task_key: task_key,
            });
            throw new TypeError(
                "Task key must be non-null and present for successful DELETE"
            );
        }

        await Task.deleteTask(task_key);

        res.status(200).json({
            statusMessage: null,
            content: "Successfully deleted task.",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            statusMessage: "Sorry, an error has occurred",
            content: null,
        });
    }
};

exports.toggleTask = async (req, res) => {
    try {
        const { task_key } = req.body;

        if (task_key == null) {
            console.log({
                task_key: task_key,
            });
            throw new TypeError(
                "Task key must be non-null and present for successful POST"
            );
        }

        await Task.toggleTask(task_key);

        res.status(200).json({
            statusMessage: null,
            content: null,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            statusMessage: "Sorry, an error has occurred",
            content: null,
        });
    }
};
