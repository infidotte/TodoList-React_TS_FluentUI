import {PrimaryButton, Stack} from '@fluentui/react';
import React, {useContext} from 'react';
import {TodoContext} from "../TodoProvider/TodoProvider";
import {ActionTypeEnum} from "../../data/Types";


const Sort = () => {
    const {dispatch} = useContext(TodoContext)

    const sortById = () => {
        dispatch({type: ActionTypeEnum.SortById})
    }
    const sortByPinned = () => {
        dispatch({type: ActionTypeEnum.SortByPinned})

    }
    return (
        <Stack
            horizontal
            style={{display: 'flex', flexWrap: 'wrap'}}>
            <PrimaryButton
                style={{margin: '5px'}}
                text="By Id"
                onClick={sortById}/>
            <PrimaryButton
                style={{margin: '5px'}}
                text="By Pin"
                onClick={sortByPinned}/>
        </Stack>
    );
};

export default Sort;