import { ITaskPayload } from "./ITaskPayload";

export interface ITaskAction {
  type: string;
  payload: ITaskPayload;
}
