'use client';
import React, { useState } from 'react';
import { Button, TextField, Callout, Text } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import errorsToRecord from '@hookform/resolvers/io-ts/dist/errorsToRecord.js';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

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
    <div
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
    </div>
  )
}

export default NewIssuePage;