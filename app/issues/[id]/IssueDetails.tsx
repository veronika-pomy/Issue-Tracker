import { StatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
        <Heading as='h2'>{issue.title}</Heading>
        <Flex gap='4'>
            <StatusBadge status={issue.status} />
            <Text as='p'>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose max-w-full'>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </>
  )
}

export default IssueDetails;

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View project issues table'
};