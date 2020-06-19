import React, { Component } from 'react';
import Chart from 'react-google-charts';


class Lineone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month1: "jun",
            month2: "feb",
            month3: "mar",
            month4: "avr",
            month5: "may",
            month6: "jun",
            val1: 1,
            val2: 2,
            val3: 3,
            val4: 4,
            val5: 5,
            val6: 6,

        }
    }



    render() {
        const { month1, month2, month3, month4, month5, month6, val1, val2, val3, val4, val5, val6 } = this.state;
        return (<div>
            <Chart style={{ color: "red" }}
                // width={'800px'}
                //  height={'400px'}

                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Year', 'Extrasolar planet'],
                    [month1, val1],
                    [month2, val2],
                    [month3, val3],
                    [month4, val4],
                    [month5, val5],
                    [month6, val6],
                    // [
                    //     'Gamma Cephei Ab',
                    //     new Date(1988, 6, 13),
                    // ],
                    // [
                    //     'HD 114762 b',
                    //     new Date(1989, 4, 4),
                    // ],
                    // [
                    //     'PSR B1257+12',
                    //     new Date(1992, 0, 22),
                    // ],
                    // ['51 Pegasi b', new Date(1995, 9, 6)],
                    // [
                    //     '47 Ursae Majoris b',
                    //     new Date(1996, 0, 17),
                    // ],
                    // [

                    //     new Date(2010, 7, 12),
                    //     1,
                    //     //  '2013'
                    // ],
                    // [

                    //     new Date(2010, 5, 23),
                    //     2,
                    //     //  '2012'
                    // ],
                    // [

                    //     new Date(2010, 10, 5),
                    //     2,
                    //     //  '2010'
                    // ],
                    // [

                    //     new Date(2010, 10, 8),
                    //     4,
                    //     // '2012'
                    // ],
                    // [

                    //     new Date(2010, 6, 10),
                    //     5,
                    //     // '2011'
                    // ],
                    // [

                    //     new Date(2010, 6, 22),
                    //     6,
                    //     // '2011'
                    // ],
                    // [

                    //     new Date(2010, 2, 22),
                    //     7,
                    //     // '2010'
                    // ],
                    // [

                    //     new Date(2010, 1, 25),
                    //     7,
                    //     // '2010'
                    // ],
                ]}
                rootProps={{ 'data-testid': '1' }}
                chartPackages={['corechart', 'controls']}

                controls={[
                    // {
                    //     controlType: 'DateRangeFilter',
                    //     options: {
                    //         filterColumnLabel: 'Year',
                    //         ui: { format: { pattern: 'yyyy' } },
                    //     },
                    // },
                    // {
                    //     controlType: 'CategoryFilter',
                    //     options: {
                    //         filterColumnIndex: 0,
                    //         ui: {
                    //             labelStacking: 'vertical',
                    //             label: 'Gender Selection:',
                    //             allowTyping: false,
                    //             allowMultiple: false,
                    //         },
                    //     },
                    // },


                    {
                        controlType: 'StringFilter',
                        options: {
                            filterColumnIndex: 0,
                            matchType: 'any', // 'prefix' | 'exact',
                            ui: {
                                label: 'Recherhce par mois',
                            },
                        },
                    },
                    // {
                    //     controlType: 'DateRangeFilter',
                    //     options: {
                    //         filterColumnLabel: 'Year',
                    //         ui: { format: { pattern: 'MM' } },
                    //     },
                    // },
                    // {
                    //     controlType: 'DateRangeFilter',
                    //     options: {
                    //         filterColumnLabel: 'Year',
                    //         ui: { format: { pattern: 'dd' } },
                    //     },
                    // },
                ]}
            />
        </div>);
    }
}

export default Lineone;