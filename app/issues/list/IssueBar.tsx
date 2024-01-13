import { Flex, Button } from '@radix-ui/themes';
import Link from 'next/link';
import FilterIssueByStatus from './FilterIssueByStatus';

const IssueBar = () => {
  return (
    <Flex mb='6' justify='between'>
      <FilterIssueByStatus />
      <Button>
        <Link href='/issues/new'>
          Add Issue
        </Link>
      </Button>
  </Flex>
  )
}

export default IssueBar;