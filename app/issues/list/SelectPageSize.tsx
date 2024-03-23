'use client';

import { Select } from '@radix-ui/themes';

const issuesPerPage: {
    label: string,
    value: string
}[] = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: '75', value: '75' },
    { label: '100', value: '100' },
];

const SelectPageSize = () => {
    return (
    <Select.Root
        defaultValue={'10'}
        // onValueChange={}
    >
        <Select.Trigger placeholder='Issues Per Page'/>
        <Select.Content>
            {issuesPerPage.map(issue => 
                <Select.Item key={issue.label} value={issue.value}>
                    {issue.label}
                </Select.Item>)}
        </Select.Content>
    </Select.Root>
    )
};

export default SelectPageSize;