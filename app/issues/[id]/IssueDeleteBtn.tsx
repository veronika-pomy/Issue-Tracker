'use client';

import { Button, AlertDialog, Flex } from '@radix-ui/themes';

const IssueDeleteBtn = ({ issueID }: { issueID: number }) => {
  return (
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
                    <Button variant='solid' color='red'>
                        Delete
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default IssueDeleteBtn;