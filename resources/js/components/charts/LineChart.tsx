import {
    LineChart as ReLineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'Sen', total: 400 },
    { name: 'Sel', total: 300 },
    { name: 'Rab', total: 500 },
    { name: 'Kam', total: 200 },
    { name: 'Jum', total: 700 },
    { name: 'Sab', total: 600 },
    { name: 'Min', total: 800 },
];

export function LineChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <ReLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
            </ReLineChart>
        </ResponsiveContainer>
    );
}
