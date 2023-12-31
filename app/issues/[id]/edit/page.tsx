import React from 'react'
import IssueForm from '../../_components/IssueForm';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';


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