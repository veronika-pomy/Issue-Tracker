'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Skeleton } from '@/app/components';

const AssignUser = ( {issue} : { issue: Issue }) => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then((res) => res.data),
        staleTime: 60 * 1000, // refetch after 60 seconds 
        retry: 3
    });

    if(isLoading) return <Skeleton height='2rem' width='10rem'/>

    if (error) return null; // don't render component

    const assignToUser = (userId: string) => {
        axios.patch(`/api/issues/${issue.id}`, { assignedUserId: userId || null });
    };

    return (
        <Select.Root 
            onValueChange={(userId) => assignToUser(userId)}
            defaultValue={issue.assignedUserId || ''}
        >
            <Select.Trigger placeholder='Assign Issue'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Users</Select.Label>
                    <Select.Item value=''>Unassigned</Select.Item>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssignUser;