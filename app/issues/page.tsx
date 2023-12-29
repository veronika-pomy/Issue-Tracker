import { Link as CustomLink, IssueBar, StatusBadge } from '@/app/components';
import prisma from "@/prisma/client";
import { Box, Table } from '@radix-ui/themes';

const IssuesPage = async () => {

  const issues = await prisma.issue.findMany();

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
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <CustomLink href={`issues/${issue.id}`}>
                  {issue.title}
                </CustomLink>
                <Box className='block md:hidden'>
                  <StatusBadge status={issue.status}/>
                </Box>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <StatusBadge status={issue.status}/>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default IssuesPage;