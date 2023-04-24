import React, {createContext, useReducer} from "react";
import {
    ActionTypeEnum,
    IAddAction,
    ICompletedAction,
    IDeleteAction,
    IFullDeleteAction,
    IRecoverAction,
    IReducerAction,
    ITask,
    ITodoContext,
    ITodoState,
    ITogglePinAction,
    IUpdateAction,
} from "../../data/Types";
import {BubbleId, BubblePinned, clone} from "../../data/utility";

type Props = {
    children: React.ReactNode
}

const tasks: ITask[] = [
    {
        id: '1',
        title: 'Task 1',
        isPinned: true
    },
    {
        id: '2',
        title: 'Task 2',
        isPinned: false
    }
]


export const TodoContext =
    createContext<ITodoContext>({
        activeTasks: [],
        completedTasks: [],
        dispatch: () => {
        }
    })

const addTaskAction = (
    state: ITodoState,
    action: IAddAction
) => {
    const {data} = action;
    data.id = new Date().toJSON()
    return [
        action.data,
        ...state.activeTasks
    ]
}
const deleteTaskAction = (
    state: ITodoState,
    action: IDeleteAction
) => {
    const activeTasks: ITask[] = clone(state.activeTasks)
    return activeTasks.filter(
        task => task.id !== action.data.id
    );
}
const fullDeleteTaskAction = (
    state: ITodoState,
    action: IFullDeleteAction
) => {
    const ct: ITask[] = clone(state.completedTasks)
    return ct.filter(
        task => task.id !== action.data.id
    );
}
const togglePinAction = (
    state: ITodoState,
    action: ITogglePinAction
) => {
    const cloneAT: ITask[] = clone(state.activeTasks)
    const index = cloneAT.findIndex(
        task => task.id === action.data.id
    )
    if (index >= 0) {
        cloneAT[index].isPinned = !cloneAT[index].isPinned
    }
    return cloneAT
}

const updateTaskAction = (
    state: ITodoState,
    action: IUpdateAction
) => {
    const cloneAT: ITask[] = clone(state.activeTasks)
    const index = cloneAT.findIndex(
        task => task.id === action.data.id
    )
    if (index >= 0) {
        cloneAT[index] = action.data as ITask;
    }
    return cloneAT
}
const completedTaskAction = (
    state: ITodoState,
    action: ICompletedAction
) => {
    const activeTasks: ITask[] = clone(state.activeTasks)
    const completedTaskData = activeTasks.find(
        task => task.id === action.data.id
    )
    const filteredData = activeTasks.filter(
        task => task.id !== action.data.id
    )
    const completedTask = completedTaskData ? [
        completedTaskData,
        ...state.completedTasks
    ] : [
        ...state.completedTasks
    ]
    return {
        activeTasks: filteredData,
        completedTasks: completedTask
    };
}
const recoverTaskAction = (
    state: ITodoState,
    action: IRecoverAction
) => {
    const ct: ITask[] = clone(state.completedTasks)
    const recoveredTaskData = ct.find(
        task => task.id === action.data.id
    )
    const filteredData = ct.filter(
        task => task.id !== action.data.id
    )
    const recoveredTasks = recoveredTaskData ? [
        recoveredTaskData,
        ...state.activeTasks
    ] : [
        ...state.activeTasks
    ]
    return {
        activeTasks: recoveredTasks,
        completedTasks: filteredData
    };
}
const sortById = (
    state: ITodoState
) => {
    const temp: ITask[] = clone(state.activeTasks);
    const sorted = BubbleId(temp);
    return {
        activeTasks: sorted
    }
}
const sortByPinned = (
    state: ITodoState
) => {
    const temp: ITask[] = clone(state.activeTasks);
    const sorted = BubblePinned(temp);
    return {
        activeTasks: sorted.reverse()
    }
}
const setLocalStorage = (res: any) => {
    localStorage.setItem('activeTasks', JSON.stringify(res.activeTasks))
    localStorage.setItem('completedTasks', JSON.stringify(res.completedTasks))
}

const reducer = (
    state: ITodoState,
    action: IReducerAction
) => {
    let res;
    let data;
    switch (action.type) {
        case ActionTypeEnum.Add:
            res = {...state, activeTasks: addTaskAction(state, action)}
            setLocalStorage(res);
            return res;
        case ActionTypeEnum.Delete:
            res = {...state, activeTasks: deleteTaskAction(state, action)};
            setLocalStorage(res);
            return res;
        case ActionTypeEnum.FullDelete:
            res = {...state, completedTasks: fullDeleteTaskAction(state, action)};
            setLocalStorage(res);
            return res;
        case ActionTypeEnum.TogglePin:
            res = {...state, activeTasks: togglePinAction(state, action)};
            setLocalStorage(res);
            return res;
        case ActionTypeEnum.Update:
            res = {...state, activeTasks: updateTaskAction(state, action)};
            setLocalStorage(res);
            return res;
        case ActionTypeEnum.Completed:
            data = completedTaskAction(state, action)
            res = {...state, activeTasks: data.activeTasks, completedTasks: data.completedTasks}
            setLocalStorage(res);
            return res;
        case ActionTypeEnum.Recover:
            data = recoverTaskAction(state, action)
            res = {...state, activeTasks: data.activeTasks, completedTasks: data.completedTasks}
            setLocalStorage(res);
            return res;
        case ActionTypeEnum.SortById:
            data = sortById(state)
            res = {...state, activeTasks: data.activeTasks}
            setLocalStorage(res);
            return res;
        case ActionTypeEnum.SortByPinned:
            data = sortByPinned(state)
            res = {...state, activeTasks: data.activeTasks}
            setLocalStorage(res);
            return res;
    }
    return {...state}
}


const TodoProvider = (props: Props) => {
    const at = localStorage.getItem('activeTasks')
    const ct = localStorage.getItem('completedTasks')
    const data: ITodoState = {
        activeTasks: at ? JSON.parse(at) : tasks,
        completedTasks: ct ? JSON.parse(ct) : []
    }
    const [
        state,
        dispatch
    ] = useReducer(reducer, data)
    return (
        <TodoContext.Provider
            value={{
                activeTasks: state.activeTasks,
                completedTasks: state.completedTasks,
                dispatch
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
