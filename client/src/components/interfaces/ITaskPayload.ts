import { ITaskState } from './ITaskState';

export interface ITaskPayload {
    task_group_key?: number;
    task_key?: number;
    title?: string;
    color?: string;
    sequence?: number;
    description?: string;
    is_completed?: number;
    fetchedTaskData?: ITaskState;
}
