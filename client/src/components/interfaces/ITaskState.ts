import { IGroup } from './IGroup';
import { ITask } from './ITask';

export interface ITaskState {
    statusMessage?: string;
    content: {
        groups: IGroup[];
        members: ITask[];
    };
}
