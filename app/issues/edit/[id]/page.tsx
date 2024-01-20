import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import IssueFormLoadingSkeleton from './loading';
import { cache } from 'react';
const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { ssr: false,
    loading: () => <IssueFormLoadingSkeleton /> }
);

interface Props {
  params: { 
      id: string
  }
}

// cache data for mult use
const fetchIssue = cache((issueId: number) =>
    // returns promise
    prisma.issue.findUnique({
        where: {
            id: issueId
        }
}));

const EditIssuePage = async ({ params }: Props) => {

    if(isNaN(parseInt(params.id))) notFound(); // if text, not number entered
    
    const issue = await fetchIssue(parseInt(params.id));

    if(!issue) notFound();

  return (
    <div>
        <IssueForm issue={issue} />
    </div>
  )
}

export default EditIssuePage;

export async function generateMetadata ({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
      title: `${issue?.title} - Edit`,
      description: `Edit ${issue?.title} Issue`
  };
};