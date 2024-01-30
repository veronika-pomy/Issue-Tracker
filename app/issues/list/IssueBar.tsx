import { Flex, Button } from '@radix-ui/themes';
import Link from 'next/link';
import FilterIssueByStatus from './FilterIssueByStatus';
import RemoveFilterParams from './RemoveFilterParams';

const IssueBar = () => {
  return (
    <Flex justify='between'>
      <Flex gap='3'>
        <FilterIssueByStatus />
        <RemoveFilterParams />
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