'use client';

import { Box, Button } from '@radix-ui/themes';
import Link from 'next/link';
import lightThemeLanding from './assets/img/lightThemeLanding.svg';

const Landing = () => {
  return (
    <Box className='landing'>
        <Button size="4" variant="outline">
            <Link
                href='/api/auth/signin'
            >
                Get Started
            </Link>
        </Button>
        <img 
            src={lightThemeLanding} 
            alt=""
        />
    </Box>
  )
}

export default Landing;