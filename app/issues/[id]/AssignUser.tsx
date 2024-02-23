'use client';

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const AssignUser = ( { issue } : { issue: Issue }) => {

    const router = useRouter();

    const { data: users, error, isLoading } = useCallUserQuery();

    if(isLoading) return <Skeleton height='2rem' width='10rem' />

    if (error) return null; // don't render component

    const assignToUser = async (userId: string) => {
        try {
            await axios.patch(
                `/api/issues/${issue.id}`, 
                { assignedUserId: userId || null }
            );
            router.refresh(); // force refresh 
        } catch (e) {
            toast.error('Couldn\'t save changes.')
        };
    };

    return (
        <>
            <Select.Root 
                onValueChange={assignToUser}
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
    );
};

// fetching users and caching functionality
const useCallUserQuery = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 720 * 60 * 1000, // refetch after 12 hrs
    retry: 3
});

export default AssignUser;