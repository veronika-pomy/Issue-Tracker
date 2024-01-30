'use client';

import React from 'react';
import { RiFilterOffLine } from "react-icons/ri";
import NextLink from 'next/link';
import { Button } from '@radix-ui/themes';

const RemoveFilterParams = ( ) => {
  return (
    <Button variant='surface'>
      <NextLink
        href='/issues/list'
      >
        <RiFilterOffLine
          className='inline' 
          width={10} 
          height={10}
        />
      </NextLink>
    </Button>
  )
}

export default RemoveFilterParams;