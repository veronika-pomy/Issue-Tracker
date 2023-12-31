import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormLoadingSkeleton from './loading';
const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { ssr: false,
    loading: () => <IssueFormLoadingSkeleton /> }
);

const EditIssuePage = async ({ params }: {params: { id: string }}) => {

    if(isNaN(parseInt(params.id))) notFound(); // if text, not number entered
    
    const issue = await prisma.issue.findUnique({
        where : {
            id: parseInt(params.id)
        }
    });

    if(!issue) notFound();

  return (
    <div>
        <IssueForm issue={issue} />
    </div>
  )
}

export default EditIssuePage;