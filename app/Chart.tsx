'use client';

import { Card } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
    issues: {
        open: number;
        inProgress: number;
        closed: number;
    }
}

const Chart = ({ issues: { open, inProgress, closed } } : Props) => {

    const issueData = [
        { label: 'Open', value: open },
        { label: 'In Progress', value: inProgress },
        { label: 'Closed', value: closed }
    ];

  return (
    <Card>
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={issueData}>
                <XAxis dataKey='label' />
                <YAxis />
                <Bar dataKey='value' barSize={80} style={{ fill: 'var(--accent-11)' }}/>
            </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart;