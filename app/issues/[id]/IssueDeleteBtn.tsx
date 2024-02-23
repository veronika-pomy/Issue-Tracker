'use client';

import Spinner from '@/app/components/Spinner';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const IssueDeleteBtn = ({ issueID }: { issueID: number }) => {

    const router = useRouter();

    const [error, setError] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const deleteBtnHandler = async () => {
        try {
            setDeleting(true);
            await axios.delete(`/api/issues/${issueID}`);
            router.push('/issues/list');
            router.refresh();
        } catch(e) {
            setDeleting(false);
            setError(true);
        }
    }

  return (
    <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
            <Button 
                color='red' 
                className='lg:w-40 lg:ml-2' 
                disabled={deleting}
            >
                Delete
                {'  '}
                {deleting && <Spinner/>}
            </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>Do you want to permanently delete this issue?</AlertDialog.Description>
                <Flex gap='4' mt='4'>
                    <AlertDialog.Cancel>
                        <Button variant='soft'>
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant='solid' color='red' onClick={deleteBtnHandler}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>Unexpected Error</AlertDialog.Title>
                <AlertDialog.Description>
                    This issue could not be deleted.
                </AlertDialog.Description>
                <Button variant="soft" mt="2" onClick={() => setError(false)}>
                    Close
                </Button>
            </AlertDialog.Content>
    </AlertDialog.Root>
  </>
  )
}

export default IssueDeleteBtn;