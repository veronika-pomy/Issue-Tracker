'use client';

import { Button } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { RiFilterOffLine } from "react-icons/ri";

const RemoveFilterParams = () => {

  const router = useRouter();

  const searchParams = useSearchParams();

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