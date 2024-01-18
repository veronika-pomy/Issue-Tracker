import prisma from '@/prisma/client';
import { Flex, Grid } from "@radix-ui/themes";
import Chart from "./Chart";
import RecentIssues from "./RecentIssues";
import Summary from "./Summary";

export default async function Home() {

const openIssues = await prisma.issue.count({ where: { status: 'OPEN' }});
const inProgressIssues = await prisma.issue.count({ where: { status: 'IN_PROGRESS' }});
const closedIssues = await prisma.issue.count({ where: { status: 'CLOSED' }});

const Issues: {
  open: number;
  inProgress: number;
  closed: number;
} = {
  open: openIssues,
  inProgress: inProgressIssues,
  closed: closedIssues,
};

  return (
    <Grid columns={{ initial: '1', md:'2' }} gap='6'>
      <Flex direction='column' gap='6'>
        <Summary issues={Issues} />
        <Chart issues={Issues} />
      </Flex>
      <RecentIssues />
    </Grid>
  )
}
