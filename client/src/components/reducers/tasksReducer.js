exports.tasksActions = {
    FETCH_GROUPS: "fetchgroups",
    ADD_GROUP: "addgroup"
}

exports.tasksReducer = (prev, action) => {
    switch (action.type) {
        // Payload: { fetchedTaskData }
        case this.tasksActions.FETCH_GROUPS:
            return action.payload.fetchedTaskData;

        // Payload: { title, color }
        case this.tasksActions.ADD_GROUP:
            const newTaskGroup = {
                task_group_key: action.payload.task_group_key,
                title: action.payload.title,
                color: action.payload.color
            }
            
            // First add the new group into the groups array
            const updatedGroups = [...prev.content.groups, newTaskGroup];

            // Then merge that updated groups array into the new content array
            const updatedContent = {groups: updatedGroups, members: prev.content.members};

            // And finally, push the new content array to the new state of taskData
            return {statusMessage: prev.statusMessage, content: updatedContent};

        default:
            return prev;
    }
}