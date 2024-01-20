import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDeleteBtn from './IssueDeleteBtn';
import IssueDetails from './IssueDetails';
import IssueEditBtn from './IssueEditBtn';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/authOptions';
import AssignUser from './AssignUser';
// Update status Btn and API

interface Props {
    params: { 
        id: string
    }
}

const IssueDetailsPage = async ({ params } : Props) => {

    const session = await getServerSession(authOptions);

    if(isNaN(parseInt(params.id))) notFound(); // if text, not number entered

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if(!issue) notFound();
    
    return (
        <Grid columns={{ initial: '1', md: '5' }} gap='5'>
                <Box className='space-y-4 md:col-span-4 mr-6'>
                    <IssueDetails issue={issue} />
                </Box>
                {session && <Box mt='4'>
                    <Flex direction={{ md: 'column' }} gap="4" align='stretch' justify='center' wrap='wrap' className='content-center'>
                        <AssignUser issue={issue} />
                        <IssueEditBtn issueID={issue.id} /> 
                        <IssueDeleteBtn issueID={issue.id} /> 
                    </Flex>
                </Box>}
        </Grid>
    )
}

export default IssueDetailsPage;

export async function generateMetadata ({ params }: Props) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    return {
        title: issue?.title,
        description: `${issue?.title} Details`
    };
};