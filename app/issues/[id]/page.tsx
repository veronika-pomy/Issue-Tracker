import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetails from './IssueDetails';
import IssueEditBtn from './IssueEditBtn';

const IssueDetailsPage = async ({ params } : { params: { id: string } }) => {

    if(isNaN(parseInt(params.id))) notFound(); // if text, not number entered

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if(!issue) notFound();
    
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
                <Box className='space-y-4'>
                    <IssueDetails issue={issue} />
                </Box>
                <Box>
                    <IssueEditBtn issueID={issue.id} /> 
                </Box>
                
        </Grid>
    )
}

export default IssueDetailsPage;