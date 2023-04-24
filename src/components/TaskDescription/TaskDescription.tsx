import {DirectionalHint, FontIcon, mergeStyles, TeachingBubble} from '@fluentui/react';
import React from 'react';
import {classNames} from "../Task/Task.style";
import {useBoolean, useId} from '@fluentui/react-hooks';
import {ITask} from "../../data/Types";

type Props = {
    task: ITask
}
const TaskDescription = ({task}: Props) => {
    const buttonId = useId('targetButton');
    const [
        teachingBubbleVisible,
        {toggle: toggleTeachingBubbleVisible}
    ] = useBoolean(false);
    return (
        <>
            <FontIcon
                id={buttonId}
                aria-label="Compass"
                iconName="info"
                className={
                    task.description ? classNames.enabled :
                        mergeStyles(classNames.enabled, classNames.disabled)
                }
                onClick={
                    task.description ? toggleTeachingBubbleVisible :
                        () => {
                            return
                        }
                }
            />
            {teachingBubbleVisible && (
                <TeachingBubble
                    calloutProps={{directionalHint: DirectionalHint.bottomCenter}}
                    target={`#${buttonId}`}
                    isWide={true}
                    hasCloseButton={true}
                    closeButtonAriaLabel="Close"
                    onDismiss={toggleTeachingBubbleVisible}
                    headline={task.title}
                >
                    {task.description}
                </TeachingBubble>
            )}
        </>
    );
};

export default TaskDescription;