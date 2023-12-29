import { Box, Text, Heading, Flex, Card } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';
import prisma from '@/prisma/client';
import StatusBadge from '../../components/StatusBadge';
import delay from 'delay';
import ReactMarkdown from 'react-markdown';

const IssueDetailsPage = async ({ params } : { params: { id: string } }) => {

    await delay(2000);

    if(isNaN(parseInt(params.id))) notFound();

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if(!issue) notFound();
    
    return (
        <Box className='space-y-4'>
            <Heading as='h2'>{issue.title}</Heading>
            <Flex gap='4'>
                <Text as='p'>
                    <StatusBadge status={issue.status} />
                </Text>
                <Text as='p'>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </Box>
    )
}

export default IssueDetailsPage;