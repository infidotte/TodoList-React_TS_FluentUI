import {IProcessedStyleSet, IStyle, mergeStyleSets} from "@fluentui/react";

interface ITaskStyle {
    taskItem: IStyle;
    textStyle: IStyle;
    enabledStyle: IStyle;
    disabledStyle: IStyle;
}

const TaskStyle: IProcessedStyleSet<ITaskStyle> = mergeStyleSets({
    taskItem: {
        maxHeight: 50,
        minHeight: 30,
        padding: 10,
        width: '100%',
        backgroundColor: '#a0aeb2',
        selectors: {
            "&:hover": {background: "#0078d4"}
        },
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        justifyContent: 'space-between'
    },
    textStyle: {
        color: 'white'
    },
    enabledStyle: {
        fontSize: 25,
        margin: '0 3px',
        selectors: {
            "&:hover": {cursor: 'pointer'}
        },
    },
    disabledStyle: {
        fontSize: 25,
        margin: '0 3px',
        selectors: {
            "&:hover": {cursor: 'default'}
        },
    }
});

export const classNames = mergeStyleSets({
    enabled: [{color: 'white'}, TaskStyle.enabledStyle],
    disabled: [{color: '#d13438'}, TaskStyle.disabledStyle]
});
export default TaskStyle;