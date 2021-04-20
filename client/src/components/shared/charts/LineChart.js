import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export default class Example extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <AreaChart
                width={800}
                height={250}
                data={this.props.data}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" />
            </AreaChart>
        );
    }
}
