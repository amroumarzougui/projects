import React, { Component } from 'react';
import Chart from 'react-google-charts';

class StringFilterChart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Chart
                    width={'100%'}
                    height={'270px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Name', 'Age'],
                        ['Jan', 12],
                        ['Feb', 20],
                        ['Mar', 7],
                        ['Avr', 54],
                        ['May', 22],
                        ['Jun', 3],
                        ['Jul', 42],
                        ['Aug', 33],
                        ['Sep', 22],
                        ['Oct', 3],
                        ['Nov', 42],
                        ['Dec', 33],
                    ]}
                    rootProps={{ 'data-testid': '6' }}
                    chartPackages={['corechart', 'controls']}
                    controls={[
                        // {
                        //     controlType: 'StringFilter',
                        //     options: {
                        //         filterColumnIndex: 0,
                        //         matchType: 'any', // 'prefix' | 'exact',
                        //         ui: {
                        //             label: 'Recherhce par mois',
                        //         },
                        //     },
                        // },
                    ]}
                />
            </div>
        );
    }
}

export default StringFilterChart;