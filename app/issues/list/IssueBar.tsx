'use client';

import { Flex, Button } from '@radix-ui/themes';
import Link from 'next/link';
import FilterIssueByStatus from './FilterIssueByStatus';
import RemoveFilterParams from './RemoveFilterParams';
import { useSearchParams } from 'next/navigation';


const IssueBar = () => {

  const searchParams = useSearchParams();

  const sort = searchParams.get('sort');

  return (
    <Flex justify='between'>
      <Flex gap='3'>
        <FilterIssueByStatus />
        {sort && <RemoveFilterParams />}
      </Flex>
      <Button>
        <Link href='/issues/new'>
          Add Issue
        </Link>
      </Button>
  </Flex>
  )
}

export default IssueBar;