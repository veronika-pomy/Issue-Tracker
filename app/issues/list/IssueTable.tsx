import { Link as CustomLink, StatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { CaretUpIcon, CaretDownIcon } from "@radix-ui/react-icons";
import { Box, Table, Avatar } from '@radix-ui/themes';
import NextLink from 'next/link';

export interface IssueQuery {
    status: Status; 
    orderBy: keyof Issue;
    page: string;
    sort: string;
    take: string;
}

interface TableIssue {
    id: number; 
    title: string; 
    description: string; 
    status: Status; 
    createdAt: Date; 
    updatedAt: Date; 
    assignedUserId: string | null;
    assignedToUser: {
      name: string;
      image: string;
    }
}

interface Props {
    searchParams: IssueQuery,
    issues: TableIssue[] | (
      { 
        assignedToUser: { 
          name: string | null; 
          image: string | null; } | null; 
      } 
      & 
      { 
        id: number; 
        title: string; 
        description: string; 
        status: Status; 
        createdAt: Date; 
        updatedAt: Date; 
        assignedUserId: string | null; 
      })[]
}
  
const IssueTable = ({ searchParams, issues } : Props) => {

  return (
    <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value, sort: searchParams.sort === 'asc' ? 'desc' : 'asc'
                  }}}
                >
                {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && searchParams.sort === 'asc'&&
                    <CaretUpIcon className='inline' width={18} height={18}/>
                  }
                {column.value === searchParams.orderBy && searchParams.sort === 'desc'&&
                  <CaretDownIcon className='inline' width={18} height={18}/>}
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell>
                Assigned User
            </Table.ColumnHeaderCell>
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
              <Table.Cell className='hidden md:table-cell'>
                {issue.assignedToUser &&  <Avatar 
                            src={issue.assignedToUser.image}
                            fallback='?' 
                            size='1' 
                            radius='full' 
                            className='cursor-pointer mr-2'
                            referrerPolicy='no-referrer'
                />}
                {issue.assignedToUser === null ? 'Unassigned' : issue.assignedToUser.name}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}

const columns: { label: string, value: keyof Issue, className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Date Created', value: 'createdAt', className: 'hidden md:table-cell' },
    // { label: 'Assigned User', value: 'assignedToUser', className: 'hidden md:table-cell' }
];

export const columnTitles = columns.map(column => column.value);

export default IssueTable;