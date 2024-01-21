import dynamic from 'next/dynamic';
import IssueFormLoadingSkeleton from './loading';
import { Metadata } from 'next';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { ssr: false,
    loading: () => <IssueFormLoadingSkeleton /> }
);

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage;

export const metadata: Metadata = {
  title: 'Issue Tracker - New Issue',
  description: 'Add a new issue'
};