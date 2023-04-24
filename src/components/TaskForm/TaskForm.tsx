import React, {useContext, useEffect, useState} from 'react';
import {DefaultButton, MessageBar, MessageBarType, Stack, TextField} from "@fluentui/react";
import useInput from "./useInput";
import {TodoContext} from "../TodoProvider/TodoProvider";
import {ActionTypeEnum, ITask} from "../../data/Types";
import Names from "../../data/NamesData.json"

type Props = {
    editTaskId: string | null
}

const TaskForm = ({editTaskId}: Props) => {
    const title = useInput('');
    const description = useInput('');

    const {
        activeTasks,
        dispatch
    } = useContext(TodoContext)

    useEffect(() => {
            if (editTaskId) {
                const taskData = activeTasks.find(
                    task => task.id === editTaskId
                )
                title.set(taskData?.title || '')
                description.set(taskData?.description || '')
            }
        },
        [activeTasks])

    useEffect(() => {
        if (showMessage.message) {
            setTimeout(() => {
                setShowMessage({type: MessageBarType.success, message: ""})
            }, 2000)
        }
    })

    const [
        showMessage,
        setShowMessage
    ] = useState<{
        type: MessageBarType,
        message: string
    }>({type: MessageBarType.success, message: ''})

    const updateTaskAction = () => {
        const taskData = activeTasks.find(
            task => task.id === editTaskId
        )
        if (taskData) {
            const data: ITask = {
                id: taskData.id,
                title: title.value,
                description: description.value,
                isPinned: taskData.isPinned
            }
            dispatch({type: ActionTypeEnum.Update, data})
            setShowMessage({type: MessageBarType.success, message: "Task updated"})
        } else {
            setShowMessage({type: MessageBarType.error, message: "Error"})
        }
    }
    const addTaskAction = () => {
        const data: ITask = {
            id: '',
            title: title.value,
            description: description.value,
            isPinned: false
        }
        dispatch({
            type: ActionTypeEnum.Add,
            data
        });
        setShowMessage({type: MessageBarType.success, message: "Task added"})
        title.set('')
        description.set('')
    }
    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        editTaskId ? updateTaskAction() : addTaskAction()
    }

    return (
        <form
            onSubmit={onFormSubmit}
            style={{margin: '5px'}}
        >
            <TextField
                label="Title"
                required {...title}
            />
            <TextField
                label="Description"
                multiline
                autoAdjustHeight {...description}
            />
            <Stack
                horizontal
                tokens={{childrenGap: 20}}
                style={{marginTop: 20}}
            >
                <Stack
                    style={{width: '80%'}}
                >
                    {showMessage.message &&
                        <MessageBar
                            messageBarType={MessageBarType.success}
                        >
                            {showMessage.message}
                        </MessageBar>
                    }
                </Stack>
                <Stack
                    style={{width: '20%'}}
                >
                    <DefaultButton
                        text={
                            editTaskId ? Names.updateTaskBtn : Names.addTaskBtn
                        }
                        type='submit'
                    />
                </Stack>
            </Stack>
        </form>
    );
};

export default TaskForm;