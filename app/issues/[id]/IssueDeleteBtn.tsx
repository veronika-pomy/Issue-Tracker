'use client';

import { Button, AlertDialog, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const IssueDeleteBtn = ({ issueID }: { issueID: number }) => {

    const router = useRouter();

    const [error, setError] = useState(false);

    const deleteBtnHandler = async () => {
        try {
            await axios.delete(`/api/issues/${issueID}`);
            router.push('/issues');
            router.refresh();
        } catch(e) {
            setError(true);
        }
    }

  return (
    <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
            <Button color='red' className='lg:w-40'>Delete</Button>
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