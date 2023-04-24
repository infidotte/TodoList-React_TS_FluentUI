import {IProcessedStyleSet, IStyle, mergeStyleSets} from "@fluentui/react";

interface IPivotStyle {
    pivotRoot: IStyle;
    pivotContainer: IStyle;
}

const PivotStyle: IProcessedStyleSet<IPivotStyle> = mergeStyleSets({
    pivotRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    pivotContainer: {
        margin: 'absolute',
    }
})

export default PivotStyle;