import {Dispatch} from "react";

export enum PivotKeysEnum {
    Tasks = "Tasks",
    TaskForm = "TaskForm",
    Completed = "Completed",
    Graph = "Graph"
}

export interface ITask {
    id: string,
    title: string,
    description?: string,
    isPinned: boolean
}

export interface ITodoContext {
    activeTasks: ITask[],
    completedTasks: ITask[]
    dispatch: Dispatch<any>
}

export interface TaskProps {
    task: ITask,
    setEditTaskId?: (taskId: string) => void
}

export interface ITodoState {
    activeTasks: ITask[];
    completedTasks: ITask[]
}

export enum ActionTypeEnum {
    Add,
    Delete,
    TogglePin,
    Update,
    Completed,
    FullDelete,
    Recover,
    SortById,
    SortByTitle,
    SortByPinned
}

export type IReducerAction =
    IAddAction |
    IDeleteAction |
    ITogglePinAction |
    IUpdateAction |
    ICompletedAction |
    IFullDeleteAction |
    IRecoverAction |
    ISortByIdAction |
    ISortByTitleAction |
    ISortByPinnedAction

export interface IAddAction {
    type: ActionTypeEnum.Add,
    data: ITask
}

export interface IDeleteAction {
    type: ActionTypeEnum.Delete,
    data: { id: string }
}

export interface IUpdateAction {
    type: ActionTypeEnum.Update,
    data: { id: string }
}

export interface ITogglePinAction {
    type: ActionTypeEnum.TogglePin,
    data: ITask

}

export interface ICompletedAction {
    type: ActionTypeEnum.Completed,
    data: { id: string }
}

export interface IFullDeleteAction {
    type: ActionTypeEnum.FullDelete,
    data: { id: string }
}

export interface IRecoverAction {
    type: ActionTypeEnum.Recover,
    data: { id: string }
}

export interface ISortByIdAction {
    type: ActionTypeEnum.SortById
}

export interface ISortByTitleAction {
    type: ActionTypeEnum.SortByTitle
}

export interface ISortByPinnedAction {
    type: ActionTypeEnum.SortByPinned
}

