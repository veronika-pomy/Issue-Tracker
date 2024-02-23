'use client';

import React from 'react';
import { Status } from '@prisma/client';
import { Select, SelectItem } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    issueStatus: Status,
    issueID: number
}

const UpdateStatus = ( { issueStatus, issueID }: Props ) => {

    const router = useRouter();

    const statuses: { label: string, value: Status }[] = [
        { label: 'Open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Closed', value: 'CLOSED' }
    ];

    const updateIssueStatus = async (issueStatus: string) => {
        try {
            await axios.patch(
                `/api/issues/${issueID}`,
                { status: issueStatus }
            );
            router.refresh(); // force refresh 
        } catch (e) {
            toast.error('Couldn\'t update status.')
        };
    };

  return (
    <>
        <Select.Root
            onValueChange={updateIssueStatus}
            defaultValue={issueStatus}
        >
            <Select.Trigger placeholder='Update Status'/>
            <Select.Content>
                <Select.Group>
                    {statuses.map((s) => (
                        <SelectItem 
                            key={s.label}
                            value={s.value}
                        >
                            {s.value}
                        </SelectItem>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster 
            toastOptions={{
                error: {
                    icon: '❗',
                    iconTheme: {
                        primary: '#3b0764',
                        secondary: 'white'
                    }
                }
            }}
        />
    </>
  )
}

export default UpdateStatus;
