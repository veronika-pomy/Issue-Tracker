import { Skeleton } from '@/app/components';
import { Box, Card, Flex, Heading } from '@radix-ui/themes';

const LoadingIssueDetailsPage = () => {
  return (
    <Box className='space-y-4 max-w-xl'>
            <Heading as='h2'>
              <Skeleton />
            </Heading>
            <Flex gap='4'>
              <Skeleton width='5rem'/>
              <Skeleton width='8rem'/>
            </Flex>
            <Card className='prose'>
              <Skeleton count={6} />
            </Card>
        </Box>
  )
}

export default LoadingIssueDetailsPage;