import React, { useEffect } from 'react'

import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const ChartBart = ({ data, loggedInUser }) => {

    const chartData = data
    useEffect(() => { }, [])

    return (
        <BarChart width={800} height={250} data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke='#000' />
            <Bar dataKey="amount" fill="#8884d8" />
            <Bar dataKey="initialAmount" fill="#82ca9d" />
        </BarChart>
    );
}

export default ChartBart
