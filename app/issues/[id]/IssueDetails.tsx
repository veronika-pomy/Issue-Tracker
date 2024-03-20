import { StatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Flex, Heading, Text } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueCard from './IssueCard';

const IssueDetails = ({ issue }: { issue: Issue }) => {

  return (
    <>
        <Heading as='h2'>{issue.title}</Heading>
        <Flex gap='4'>
            <StatusBadge status={issue.status} />
            <Text as='p'>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <IssueCard description={issue.description} />
    </>
  )
}

export default IssueDetails;

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View project issues table'
};