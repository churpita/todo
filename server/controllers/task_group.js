const TaskGroup = require("../queries/task_group");

exports.getGroups = async (req, res) => {
    try {
        const groups = await TaskGroup.fetchAllGroups();
        const members = await TaskGroup.fetchAllGroupMembers();
        res.status(200).json({
            statusMessage: null,
            content: {
                groups: groups[0],
                members: members[0],
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

exports.addGroup = async (req, res) => {
    try {
        const { task_group_key, title, color } = req.body;

        if (task_group_key == null || title == null || color == null) {
            console.log({
                task_group_key: task_group_key,
                title: title,
                color: color,
            });
            throw new TypeError(
                "All values must be non-null and present for successful POST"
            );
        }

        const newGroupObj = {
            task_group_key,
            title,
            color,
        };

        await TaskGroup.addGroup(newGroupObj);

        res.status(200).json({
            statusMessage: null,
            content: {
                newGroup: newGroupObj,
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

exports.updateGroup = async (req, res) => {
    try {
        const { task_group_key, title, color } = req.body;

        if (task_group_key == null || title == null || color == null) {
            console.log({
                task_group_key: task_group_key,
                title: title,
                color: color,
            });
            throw new TypeError(
                "All values must be non-null and present for successful POST"
            );
        }

        const updatedGroupObj = {
            task_group_key,
            title,
            color,
        };

        await TaskGroup.updateGroup(updatedGroupObj);

        res.status(200).json({
            statusMessage: null,
            content: {
                updatedGroupObj: updatedGroupObj,
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

exports.deleteGroup = async (req, res) => {
    try {
        const { task_group_key } = req.body;

        if (task_group_key == null) {
            console.log({
                task_group_key: task_group_key,
            });
            throw new TypeError(
                "Task group key must be non-null and present for successful DELETE"
            );
        }

        await TaskGroup.deleteGroup(task_group_key);

        res.status(200).json({
            statusMessage: null,
            content: "Successfully deleted task group.",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            statusMessage: "Sorry, an error has occurred",
            content: null,
        });
    }
};
