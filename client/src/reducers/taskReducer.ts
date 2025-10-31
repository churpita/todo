import { ITask } from '../interfaces/ITask';
import { ITaskAction } from '../interfaces/ITaskAction';
import { ITaskState } from '../interfaces/ITaskState';

export const taskActions = {
    FETCH_GROUPS: 'fetchgroups',
    ADD_GROUP: 'addgroup',
    UPDATE_GROUP: 'updategroup',
    DELETE_GROUP: 'deletegroup',
    ADD_GROUP_MEMBER: 'addgroupmember',
    UPDATE_GROUP_MEMBER: 'updategroupmember',
    DELETE_GROUP_MEMBER: 'deletegroupmember',
    TOGGLE_GROUP_MEMBER: 'togglegroupmember',
};

export const taskReducer = (
    prev: ITaskState,
    action: ITaskAction
): ITaskState => {
    var updatedGroups;
    var updatedMembers;
    var updatedContent;
    switch (action.type) {
        // Payload: { fetchedTaskData }
        case taskActions.FETCH_GROUPS:
            if (action.payload.fetchedTaskData) {
                return action.payload.fetchedTaskData;
            } else {
                return prev;
            }

        // Payload: { task_group_key, title, color }
        case taskActions.ADD_GROUP:
            const newTaskGroup = {
                task_group_key: action.payload.task_group_key,
                title: action.payload.title,
                color: action.payload.color,
            };

            // First add the new group into the groups array
            updatedGroups = [...prev.content.groups, newTaskGroup];

            // Then merge that updated groups array into the new content array
            updatedContent = {
                groups: updatedGroups,
                members: prev.content.members,
            };

            // And finally, push the new content array to the new state of taskData
            return {
                statusMessage: prev.statusMessage,
                content: updatedContent,
            };

        // Payload: { task_group_key, title, color }
        case taskActions.UPDATE_GROUP:
            const updatedTaskGroup = {
                task_group_key: action.payload.task_group_key,
                title: action.payload.title,
                color: action.payload.color,
            };

            return {
                statusMessage: prev.statusMessage,
                content: {
                    groups: prev.content.groups.map((group) => {
                        return group.task_group_key ==
                            updatedTaskGroup.task_group_key
                            ? updatedTaskGroup
                            : group;
                    }),
                    members: prev.content.members,
                },
            };

        // Payload: { task_group_key }
        case taskActions.DELETE_GROUP:
            updatedGroups = prev.content.groups.filter(
                (group) => group.task_group_key != action.payload.task_group_key
            );
            updatedMembers = prev.content.members.filter(
                (member) =>
                    member.task_group_key != action.payload.task_group_key
            );

            updatedContent = { groups: updatedGroups, members: updatedMembers };

            return {
                statusMessage: prev.statusMessage,
                content: updatedContent,
            };

        // Payload: { task_group_key, task_key, sequence, title, description }
        case taskActions.ADD_GROUP_MEMBER:
            const newTask = {
                task_group_key: action.payload.task_group_key,
                task_key: action.payload.task_key,
                sequence: action.payload.sequence,
                title: action.payload.title,
                description: action.payload.description,
            };

            // First add the new task into the members array
            updatedMembers = [...prev.content.members, newTask];

            // Then merge that updated members array into the new content array
            updatedContent = {
                groups: prev.content.groups,
                members: updatedMembers,
            };

            // And finally, push the new content array to the new state of taskData
            return {
                statusMessage: prev.statusMessage,
                content: updatedContent,
            };

        // Payload: { task_group_key, task_key, sequence, title, description }
        case taskActions.UPDATE_GROUP_MEMBER:
            const updatedTask = {
                task_key: action.payload.task_key,
                title: action.payload.title,
                description: action.payload.description,
            };

            console.log({
                groups: prev.content.groups,
                members: prev.content.members.map((member) => {
                    return member.task_key == updatedTask.task_key
                        ? {
                              task_group_key: member.task_group_key,
                              task_key: updatedTask.task_key,
                              sequence: member.sequence,
                              title: updatedTask.title,
                              description: updatedTask.description,
                              is_completed: member.is_completed,
                          }
                        : member;
                }),
            });

            return {
                statusMessage: prev.statusMessage,
                content: {
                    groups: prev.content.groups,
                    members: prev.content.members.map((member) => {
                        return member.task_key == updatedTask.task_key
                            ? {
                                  task_group_key: member.task_group_key,
                                  task_key: updatedTask.task_key,
                                  sequence: member.sequence,
                                  title: updatedTask.title,
                                  description: updatedTask.description,
                                  is_completed: member.is_completed,
                              }
                            : member;
                    }),
                },
            };

        // Payload: { task_key }
        case taskActions.DELETE_GROUP_MEMBER:
            updatedMembers = prev.content.members.filter(
                (member) => member.task_key != action.payload.task_key
            );

            updatedContent = {
                groups: prev.content.groups,
                members: updatedMembers,
            };

            return {
                statusMessage: prev.statusMessage,
                content: updatedContent,
            };

        // Payload: { task_group_key, task_key, sequence, title, description }
        case taskActions.TOGGLE_GROUP_MEMBER:
            const toggledGroupMember: ITask = {
                task_group_key: action.payload.task_group_key,
                task_key: action.payload.task_key,
                sequence: action.payload.sequence,
                title: action.payload.title,
                description: action.payload.description,
                is_completed: action.payload.is_completed ? undefined : 1,
            };
            return {
                statusMessage: prev.statusMessage,
                content: {
                    groups: prev.content.groups,
                    members: prev.content.members.map((member) => {
                        return member.task_key == toggledGroupMember.task_key
                            ? toggledGroupMember
                            : member;
                    }),
                },
            };

        default:
            return prev;
    }
};
