import {Pivot, PivotItem, Stack} from "@fluentui/react";
import PivotStyle from "./PivotComponent.style";
import React, {useContext, useState} from "react";
import {PivotKeysEnum} from "../../data/Types"
import Names from "../../data/NamesData.json"
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import Graph from "../Graph/Graph"
import {TodoContext} from "../TodoProvider/TodoProvider";
import Sort from "../Sort/Sort";

export function PivotComponent() {
    const [
        selectedKey,
        setSelectedKey
    ] = useState<string>(PivotKeysEnum.Tasks);
    const [
        editTaskId,
        setEditTaskId
    ] = useState<string | null>(null)
    const {
        activeTasks,
        completedTasks
    } = useContext(TodoContext)
    const onEditTask = (id: string) => {
        setEditTaskId(id)
        setSelectedKey(PivotKeysEnum.TaskForm)
    }

    return <Stack className={PivotStyle.pivotContainer}>
        <Pivot
            selectedKey={String(selectedKey)}
            styles={{root: PivotStyle.pivotRoot}}
            onLinkClick={
                (item?: PivotItem) => {
                    if (item?.props.itemKey !== PivotKeysEnum.TaskForm) {
                        setEditTaskId(null)
                    }
                    setSelectedKey(item?.props.itemKey || PivotKeysEnum.Tasks);
                }
            }
        >
            <PivotItem
                headerText={Names.pivots.tasksTab}
                itemKey={PivotKeysEnum.Tasks}
            >
                <Stack
                    horizontal
                    style={{
                        justifyContent: 'center',
                        padding: 5
                    }}
                >
                    <Sort></Sort>
                </Stack>
                <TaskList
                    type={true}
                    tasks={activeTasks}
                    setEditTaskId={onEditTask}
                />
            </PivotItem>
            <PivotItem
                headerText={Names.pivots.tasksFormTab}
                itemKey={PivotKeysEnum.TaskForm}
            >
                <TaskForm
                    editTaskId={editTaskId}
                ></TaskForm>
            </PivotItem>
            <PivotItem
                headerText={Names.pivots.completed}
                itemKey={PivotKeysEnum.Completed}
            >
                <TaskList
                    type={false}
                    tasks={completedTasks}
                ></TaskList>
            </PivotItem>
            <PivotItem
                headerText="Graph"
                itemKey={PivotKeysEnum.Graph}
            >
                <Graph></Graph>
            </PivotItem>
        </Pivot>
    </Stack>
}