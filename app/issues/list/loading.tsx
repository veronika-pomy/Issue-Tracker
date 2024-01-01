import { Skeleton } from '@/app/components';
import { Box, Table } from '@radix-ui/themes';
import IssueBar from './IssueBar';

const LoadingIssuesPage = () => {

    const issues = [ 1, 2, 3, 4, 5, 6 ];

    return (
        <Box>
            <IssueBar />
            <Table.Root variant='surface'>
            <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Date Created</Table.ColumnHeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {issues.map((issue) => (
                <Table.Row key={issue}>
                <Table.RowHeaderCell>
                    <Skeleton />
                    <Box className='block md:hidden'>
                        <Skeleton />
                    </Box>
                </Table.RowHeaderCell>
                <Table.Cell className='hidden md:table-cell'>
                    <Skeleton />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                    <Skeleton />
                </Table.Cell>
                </Table.Row>

            ))}
            </Table.Body>
        </Table.Root>
        </Box>
    )
}

export default LoadingIssuesPage;