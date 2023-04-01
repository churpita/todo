const TaskGroup = require('../queries/task_group');

exports.getGroups = (req, res) => {
    TaskGroup.fetchAllGroups()
        .then(groups => {
            res.status(200).json({
                statusMessage: null,
                content: groups[0]
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                statusMessage: 'Sorry, an error has occurred',
                content: null
            });
        });
};