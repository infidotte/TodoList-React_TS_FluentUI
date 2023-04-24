import React from 'react';
import AppStyle from "./App.style";
import NamesData from "../../data/NamesData.json"
import {PivotComponent} from "../PivotComponent/PivotComponent";
import {Stack} from "@fluentui/react";
import {initializeIcons} from "@fluentui/font-icons-mdl2";
import TodoProvider from "../TodoProvider/TodoProvider";

initializeIcons();

function App() {
    return (
        <TodoProvider>
            <Stack className={AppStyle.todoContainer}>
                <header className={AppStyle.headerStyle}>
                    <h2>{NamesData.header}</h2>
                </header>
                <PivotComponent></PivotComponent>
            </Stack>
        </TodoProvider>
    );
}

export default App;
