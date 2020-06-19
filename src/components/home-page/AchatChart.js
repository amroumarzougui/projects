import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';


class AchatChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Jan', 'Feb', 'Mar', 'Avr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Montant en TND',
                        data: [
                            54544,
                            12121,
                            53633,
                            66555,
                            64545,
                            22222,
                            54544,
                            12121,
                            53633,
                            66555,
                            64545,
                            22222
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',

                        ]
                    }
                ]
            }
        }
    }
    render() {
        return (
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    width={'300px'}
                    height={'300px'}
                    options={{
                        maintainAspectRatio: false
                    }}
                />

            </div>
        );
    }
}

export default AchatChart;