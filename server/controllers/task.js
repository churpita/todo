const Task = require('../queries/task');

exports.addTask = async (req, res) => {
    try {
        const {task_group_key, task_key, sequence, title, description} = req.body;
        
        if (task_group_key == null || task_key == null || sequence == null || title == null) {
            console.log({
                task_group_key: task_group_key,
                task_key: task_key,
                sequence: sequence,
                title: title,
                description: description
            });
            throw new TypeError("Task group key, task key, sequence, and title must be non-null and present for successful POST");
        }

        const newTaskObj = {
            task_key, 
            title, 
            description
        };

        const newMapObj = {
            task_group_key,
            task_key,
            sequence
        }

        await Task.addTask(newTaskObj);
        await Task.mapTask(newMapObj);
        // need some sort of check/error handling for any use cases where the task is added, but the mapping add fails

        res.status(200).json({
            statusMessage: null,
            content: {
                newTask: {task_group_key, task_key, sequence, title, description}
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            statusMessage: 'Sorry, an error has occurred',
            content: null
        });
    }
}