'use client';

import React from 'react';
import { RiFilterOffLine } from "react-icons/ri";
import NextLink from 'next/link';
import { Button } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';


const RemoveFilterParams = () => {

  const router = useRouter();

  const searchParams = useSearchParams();

  // console.log(searchParams);

  return (
    <Button 
      variant='surface'
      onClick={() => {
        const params = new URLSearchParams();
        const page = searchParams.get('page');
        const status = searchParams.get('status');
        if(status)
          params.append('status', status);
        if(page)
          params.append('page', page);
        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues/list/' + query)}
      }>
        <RiFilterOffLine
          className='inline' 
          width={10} 
          height={10}
        />
    </Button>
  )
}

export default RemoveFilterParams;