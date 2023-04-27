import React, {useContext} from 'react';
// @ts-ignore
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, BarElement} from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2';
import {Stack} from "@fluentui/react";
import {TodoContext} from "../TodoProvider/TodoProvider";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);

const Graph = () => {
    const {
        activeTasks,
        completedTasks
    } = useContext(TodoContext)

    const data = {

        labels: ['Active', 'Completed'],
        datasets: [
            {
                label: '# of Votes',
                data: [activeTasks ? activeTasks.length : 0, completedTasks ? completedTasks.length : 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const countPinned = () => {
        let count = 0;
        // eslint-disable-next-line array-callback-return
        activeTasks.map(task => {
            if (task.isPinned) {
                count++;
            }
        })
        return count;
    }
    const barData = {
        labels: ['Pinned', 'UnPinned'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [countPinned(), activeTasks.length - countPinned()],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    return <Stack>
        <Pie
            data={data}
        />
        <Bar
            options={options}
            data={barData}
        />
    </Stack>;
};

export default Graph;