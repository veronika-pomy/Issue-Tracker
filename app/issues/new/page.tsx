'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const SimpleMDE = dynamic(() => 
    import ('react-simplemde-editor'),
    { ssr: false }
);

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = async () => {

    const router = useRouter();
    
    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    
    const onSubmit = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
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
                <TextField.Input placeholder="Title" {...register('title')} />
            </TextField.Root>
            <ErrorMessage children={errors.title?.message} />
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
            />
            <ErrorMessage children={errors.description?.message} />
            <Button disabled={isSubmitting}>Submit {isSubmitting && <Spinner/>}</Button>
        </form>
    </Box>
  )
}

export default NewIssuePage;