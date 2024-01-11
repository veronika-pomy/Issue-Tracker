'use client';

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Skeleton } from '@/app/components';

const AssignUser = () => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then((res) => res.data),
        staleTime: 60 * 1000, // refetch after 60 seconds 
        retry: 3
    });

    if(isLoading) return <Skeleton height='2rem' width='10rem'/>

    if (error) return null; // don't render component

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign Issue'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Users</Select.Label>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssignUser;