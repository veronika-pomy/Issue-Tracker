import { Button, Text, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { HiPencil } from 'react-icons/hi2';

const IssueEditBtn = ({ issueID }: { issueID: number }) => {
  return (
    <Link
    href={`/issues/${issueID}/edit`}
    >
      <Button className='lg:w-40'>
        <Flex  align='center' gap='1'>
          <HiPencil />
          <Text>Edit</Text>
        </Flex>
      </Button>
    </Link>
  )
}

export default IssueEditBtn;