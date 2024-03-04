import React from 'react';
import {Area,
    AreaChart,
    ResponsiveContainer,
    YAxis,
    XAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const productSales = [
    {
        name: "Jan",
        product1: 4000,
        product2: 2400,
    },
    {
        name: "Feb",
        product1: 3000,
        product2: 2100,
    },
    {
        name: "March",
        product1: 2000,
        product2: 1500,
    },
    {
        name: "June",
        product1: 1000,
        product2: 1000,
    },
    {
        name: "July",
        product1: 1600,
        product2: 1300,
    },
    {
        name: "August",
        product1: 3000,
        product2: 2700,
    },
    {
        name: "September",
        product1: 2000,
        product2: 1300,
    },
    {
        name: "October",
        product1: 4000,
        product2: 3400,
    },
    {
        name: "November",
        product1: 1300,
        product2: 1200,
    },
    {
        name: "December",
        product1: 3400,
        product2: 2700,
    }
]

const AreaChartComponent = () => {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <AreaChart width="100%" height="100%" data={productSales}>
                <YAxis />
                <XAxis dataKey="name"/>
                <CartesianGrid strokeDasharray="5 5"/>

                <Tooltip />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="product1"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    stackId="1"
                />
                <Area
                    type="monotone"
                    dataKey="product2"
                    stroke="#7c3aed"
                    fill="#8b5cf6"
                    stackId="1"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartComponent;