const TaskGroup = require('../queries/task_group');

exports.getGroups = async (req, res) => {
    try {
        const groups = await TaskGroup.fetchAllGroups();
        const members = await TaskGroup.fetchAllGroupMembers();
        res.status(200).json({
            statusMessage: null,
            content: {
                groups: groups[0],
                members: members[0]
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            statusMessage: 'Sorry, an error has occurred',
            content: null
        });
    }
};