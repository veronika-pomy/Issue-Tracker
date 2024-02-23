import { Button, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { HiPencil } from 'react-icons/hi2';

const IssueEditBtn = ({ issueID }: { issueID: number }) => {
  return (
    <Link
    href={`/issues/edit/${issueID}`}
    >
      <Button className='lg:w-40 lg:ml-2'>
        <Flex  align='center' gap='1'>
          <HiPencil />
          <Text>Edit</Text>
        </Flex>
      </Button>
    </Link>
  )
}

export default IssueEditBtn;