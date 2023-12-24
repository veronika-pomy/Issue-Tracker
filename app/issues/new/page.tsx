'use client';
import React, { useState } from 'react';
import { Button, TextField, Callout } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IssueForm {
    title: string, 
    description: string
}

const NewIssuePage = () => {

    const router = useRouter();
    
    const { register, control, handleSubmit } = useForm<IssueForm>();
    
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
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
            />
            <Button>Submit</Button>
        </form>
    </div>
    
  )
}

export default NewIssuePage;