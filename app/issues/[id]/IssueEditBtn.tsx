import { Button, Text, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { HiPencil } from 'react-icons/hi2';

const IssueEditBtn = ({ issueID }: { issueID: number }) => {
  return (
    <Button>
        
        <Link
            href={`/issues/${issueID}/edit`}
        >
            <Flex  align='center' gap='1'>
                <HiPencil />
                <Text>Edit</Text>
            </Flex>
        </Link>
    </Button>
  )
}

export default IssueEditBtn;