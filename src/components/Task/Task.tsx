import {Checkbox, FontIcon, Stack} from '@fluentui/react';
import React, {useContext} from 'react';
import {ActionTypeEnum, TaskProps} from "../../data/Types";
import TaskStyle, {classNames} from "./Task.style"
import {TodoContext} from "../TodoProvider/TodoProvider";
import Names from "../../data/NamesData.json"
import TaskDescription from "../TaskDescription/TaskDescription";


const Task = ({task, setEditTaskId}: TaskProps) => {
    const {dispatch} = useContext(TodoContext)

    const onTaskEdit = () => {
        if (setEditTaskId) {
            setEditTaskId(task.id)
        }
    }
    const onTaskDelete = (id: string) => {
        if (window.confirm(Names.deleteConfirm))
            dispatch({type: ActionTypeEnum.Delete, data: {id}})
    }

    const onPinClick = (id: string) => {
        dispatch({type: ActionTypeEnum.TogglePin, data: {id}})
    }

    const onCheckboxClick = (id: string) => {
        dispatch({type: ActionTypeEnum.Completed, data: {id}})
    }

    return <Stack
        horizontal
        className={TaskStyle.taskItem}>
        <Stack
            horizontal
            style={{color: "white"}}>
            <Checkbox
                onChange={
                    () => {
                        onCheckboxClick(task.id)
                    }
                }
            />
            {task.title}
        </Stack>
        <Stack horizontal>
            <TaskDescription
                task={task}
            ></TaskDescription>
            <FontIcon aria-label="Compass"
                      style={
                          task.isPinned ? {color: '#004e8c'} : {}
                      }
                      iconName={
                          task.isPinned ? "pinned" : "pin"
                      }
                      className={classNames.enabled}
                      onClick={
                          () => onPinClick(task.id)
                      }
            />
            <FontIcon aria-label="Compass" iconName="edit"
                      className={classNames.enabled}
                      onClick={
                          () => {
                              onTaskEdit()
                          }
                      }
            />
            <FontIcon aria-label="Compass" iconName="delete"
                      className={classNames.enabled}
                      onClick={
                          () => onTaskDelete(task.id)
                      }
            />
        </Stack>
    </Stack>

};

export default Task;