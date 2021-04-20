import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class Example extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BarChart
                width={500}
                height={300}
                data={this.props.data1}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
                barSize={20}
            >
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="type" fill="black" background={{ fill: '#eee' }} />
            </BarChart>
        );
    }
}
