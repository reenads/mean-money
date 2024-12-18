import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale, Legend   } from "chart.js";
ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale, Legend);

export const BarChart = ({ realSpendingData, goalData }) => {

    return (
        <div className="chart-container">
            <Bar
                data={{
                    labels: ['Food and Drink', 'Social and Entertainment', 'Shopping', 'Holiday and Travel', 'Health and Beauty', 'Miscellaneous'],
                    datasets: [{
                        label: 'Monthly Goal',
                        data: [
                            goalData['Food and Drink'],
                            goalData['Social and Entertainment'],
                            goalData['Shopping'],
                            goalData['Holiday and Travel'],
                            goalData['Health and Beauty'],
                            goalData['Miscellaneous']
                        ],
                        backgroundColor: '#4287f5',
                        borderWidth: 1
                    },
                    {
                        label: 'Real Spending',
                        data: [

                            realSpendingData['Food and Drink'],
                            realSpendingData['Social and Entertainment'],
                            realSpendingData['Shopping'],
                            realSpendingData['Holiday and Travel'],
                            realSpendingData['Health and Beauty'],
                            realSpendingData['Miscellaneous']
                        ],
                        backgroundColor: '#f57542',
                        borderWidth: 1
                    }]
                }}

                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "spending for the allocated period vs. your monthly goals"
                        },
                        legend: {
                            display: true,
                            position: "top",

                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks:{
                                callback: function(value) {
                                return '£'+value;
                            }
                        }
                        }
                    }
                }}
            />
        </div>
    )
}