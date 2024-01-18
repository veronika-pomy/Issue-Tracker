import RecentIssues from "./RecentIssues";
import Summary from "./Summary";
import prisma from '@/prisma/client';

export default async function Home() {

const openIssues = await prisma.issue.count({ where: { status: 'OPEN' }});
const inProgressIssues = await prisma.issue.count({ where: { status: 'IN_PROGRESS' }});
const closedIssues = await prisma.issue.count({ where: { status: 'CLOSED' }});

  return (
    <div>
      <Summary open={openIssues} inProgress={inProgressIssues} closed={closedIssues} />
      {/* <RecentIssues /> */}
    </div>
  )
}
