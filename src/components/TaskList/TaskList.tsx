import React from 'react';
import Task from "../Task/Task";
import {ITask} from "../../data/Types";
import CompletedTask from "../Task/CompletedTask";

type Props = {
    type: boolean
    tasks: ITask[]
    setEditTaskId?: (taskId: string) => void
}

const TaskList = ({setEditTaskId, tasks, type}: Props) => {
    return (
        <div>
            {type && tasks.map(
                (task) => {
                    return <Task
                        task={task}
                        setEditTaskId={setEditTaskId}
                        key={task.id}
                    ></Task>
                }
            )}
            {!type && tasks.map(
                (task) => {
                    return <CompletedTask
                        task={task}
                        key={task.id}
                    ></CompletedTask>
                }
            )}
        </div>
    );
};

export default TaskList;
