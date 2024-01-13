import { Link as CustomLink, StatusBadge } from '@/app/components';
import prisma from "@/prisma/client";
import { Box, Table } from '@radix-ui/themes';
import IssueBar from './IssueBar';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { CaretUpIcon } from "@radix-ui/react-icons";

const IssuesPage = async ({ searchParams } :
    { searchParams: { status: Status; orderBy: keyof Issue }}
) => {

  const columns: { label: string, value: keyof Issue, className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Date Created', value: 'createdAt', className: 'hidden md:table-cell' }
  ];

  // validate params status before passing to prisma
  const statusValues = Object.values(Status);

  const status = statusValues.includes(searchParams.status) ? 
    searchParams.status : undefined;

    // validate params order before passing to prisma
    const orberByOptions = columns.map(column => column.value);

    const orderBy = orberByOptions.includes(searchParams.orderBy) ? { [ searchParams.orderBy ]: 'asc' } : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status
    },
    orderBy
  });

  return (
    <Box>
      <IssueBar />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value }
                  }}
                >
                {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && 
                  <CaretUpIcon className='inline' width={18} height={18}/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <CustomLink href={`/issues/${issue.id}`}>
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

// opt-out of static server rendering for issues route
export const dynamic = 'force-dynamic';

export default IssuesPage;