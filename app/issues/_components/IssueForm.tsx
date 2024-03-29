'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Box, Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type Form = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {

    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
        resolver: zodResolver(issueSchema)
    });

    const onSubmit = async (data: Form) => {
        try {
            if(issue) await axios.patch(`/api/issues/${issue.id}`, data);
            else await axios.post('/api/issues', data);
            router.push('/issues/list');
            router.refresh(); // force refresh issues route to immidiately see the new/updated issue
        } catch (e) {
            setError('An unexpected error occurred. Please try again.');
        }
    }

    const [error, setError] = useState('');

    return (
        <Box
            className='max-w-xl'
        >
            {error && 
                <Callout.Root color="red" className='mb-5'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }
            <form 
                className='space-y-3'
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    defaultValue={issue?.description}
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>}
                    
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update' : 'Submit'}{' '}
                    {isSubmitting && <Spinner/>}
                </Button>
            </form>
        </Box>
    )
}

export default IssueForm;