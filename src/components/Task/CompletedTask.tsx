import React, {useContext} from 'react';
import {TodoContext} from "../TodoProvider/TodoProvider";
import Names from "../../data/NamesData.json";
import {ActionTypeEnum, TaskProps} from "../../data/Types";
import TaskStyle, {classNames} from "./Task.style";
import TaskDescription from "../TaskDescription/TaskDescription";
import {Checkbox, FontIcon, Stack} from '@fluentui/react';

const CompletedTask = ({task}: TaskProps) => {
    const {dispatch} = useContext(TodoContext)

    const onTaskDelete = (id: string) => {
        if (window.confirm(Names.deleteConfirm))
            dispatch({type: ActionTypeEnum.FullDelete, data: {id}})
    }

    const onTaskRecover = (id: string) => {
        dispatch({type: ActionTypeEnum.Recover, data: {id}})
    }


    return <Stack
        horizontal
        className={TaskStyle.taskItem}
    >
        <Stack
            horizontal
            style={{color: "white"}}
        >
            <Checkbox
                disabled
            />
            {task.title}
        </Stack>
        <Stack horizontal>
            <TaskDescription
                task={task}
            ></TaskDescription>
            <FontIcon aria-label="Compass"
                      iconName='Unpin'
                      className={classNames.disabled}
            />
            <FontIcon aria-label="Compass" iconName="upload"
                      className={classNames.enabled}
                      onClick={
                          () => {
                              onTaskRecover(task.id)
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

export default CompletedTask;