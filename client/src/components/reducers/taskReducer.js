exports.taskActions = {
    FETCH_GROUPS: "fetchgroups",
    ADD_GROUP: "addgroup",
    UPDATE_GROUP: "updategroup",
    ADD_GROUP_MEMBER: "addgroupmember"
}

exports.taskReducer = (prev, action) => {
    switch (action.type) {
        // Payload: { fetchedTaskData }
        case this.taskActions.FETCH_GROUPS:
            return action.payload.fetchedTaskData;


        // Payload: { task_group_key, title, color }
        case this.taskActions.ADD_GROUP:
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


        // Payload: { task_group_key, title, color }
        case this.taskActions.UPDATE_GROUP:
            const updatedTaskGroup = {
                task_group_key: action.payload.task_group_key,
                title: action.payload.title,
                color: action.payload.color
            }

            return {
                statusMessage: prev.statusMessage,
                content: {
                    groups: prev.content.groups.map((group) => { return group.task_group_key == updatedTaskGroup.task_group_key ? updatedTaskGroup : group }),
                    members: prev.content.members
                }
            }

        case this.taskActions.ADD_GROUP_MEMBER:
            return prev;

        default:
            return prev;
    }
}