import { Box, Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const IssueBar = () => {
  return (
    <Box className='mb-6'>
      <Button>
        <Link href='/issues/new'>
          Add Issue
        </Link>
      </Button>
  </Box>
  )
}

export default IssueBar;