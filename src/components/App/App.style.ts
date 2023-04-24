import {IProcessedStyleSet, IStyle, mergeStyleSets} from "@fluentui/react";

interface IAppStyle {
    todoContainer: IStyle;
    headerStyle: IStyle
}

const AppStyle: IProcessedStyleSet<IAppStyle> = mergeStyleSets({
    todoContainer: {
        width: '50%',
        height: '80%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
    },
    headerStyle: {
        height: 50,
        backgroundColor: '#0078d4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }
})

export default AppStyle;