import {ITask} from "./Types";

export const clone = <T, >(data: T) => {
    return JSON.parse(JSON.stringify(data))
}

export const BubbleId = (tasks: ITask[]) => {
    for (let j = tasks.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (tasks[i].id > tasks[i + 1].id) {
                let temp = tasks[i];
                tasks[i] = tasks[i + 1];
                tasks[i + 1] = temp;
            }
        }
    }
    return tasks;
}
export const BubblePinned = (tasks: ITask[]) => {
    for (let j = tasks.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (tasks[i].isPinned > tasks[i + 1].isPinned) {
                let temp = tasks[i];
                tasks[i] = tasks[i + 1];
                tasks[i + 1] = temp;
            }
        }
    }
    return tasks;
}