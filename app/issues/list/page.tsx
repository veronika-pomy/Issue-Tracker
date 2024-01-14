import prisma from "@/prisma/client";
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import IssueBar from './IssueBar';

import Pagination from '@/app/components/Pagination';
import IssueTable, { IssueQuery, columnTitles } from "./IssueTable";

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams } : Props) => {

  // validate params status before passing to prisma
  const statusValues = Object.values(Status);

  const status = statusValues.includes(searchParams.status) ? 
    searchParams.status : 
    undefined;

  // validate params order before passing to prisma
  const orberByOptions = columnTitles;

  const orderBy = orberByOptions.includes(searchParams.orderBy) ? 
    { [ searchParams.orderBy ]: 'asc' } : 
    undefined;

  const page = parseInt(searchParams.page) || 1;

  const pageSize = 10;

  const where = { status };

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1)*pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="5">
      <IssueBar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination itemCount={issueCount} itemsPerPage={pageSize} currentPage={page} />
    </Flex>
  )
}

// opt-out of static server rendering for issues route
export const dynamic = 'force-dynamic';

export default IssuesPage;