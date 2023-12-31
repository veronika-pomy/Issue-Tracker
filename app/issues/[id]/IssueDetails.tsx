import { Issue } from '@prisma/client';
import { StatusBadge } from '@/app/components';
import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
        <Heading as='h2'>{issue.title}</Heading>
        <Flex gap='4'>
            <StatusBadge status={issue.status} />
            <Text as='p'>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose'>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </>
  )
}

export default IssueDetails;