import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
    issues: {
        open: number;
        inProgress: number;
        closed: number;
    }
};

const Summary = ( { issues: { open, inProgress, closed } } : Props ) => {

    const summary: {
        label: string,
        value: number,
        status: Status
    }[] = [
        { label: 'Open Issues', value: open, status: 'OPEN' },
        { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
        { label: 'Closed Issues', value: closed, status: 'CLOSED' }
    ];

  return (
    <Flex gap='6' className='justify-around'>
        {summary.map(item => (
            <Card key={item.label}>
                <Flex direction='column' gap='2' >
                    <Link
                        href={`/issues/list?status=${item.status}`}
                        className='text-sm font-medium'
                    >
                        {item.label}
                    </Link>
                    <Text size='4' className='font-bold'>
                        {item.value}
                    </Text>
                </Flex>
            </Card>
        ))}
    </Flex>
  );
}:

export default Summary;