'use client';

import { Box, Button } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import darkThemeLanding from './assets/img/darkThemeLanding.svg';
import lightThemeLanding from './assets/img/lightThemeLanding.svg';
import { useThemeContext } from './context/useThemeContext';
import { useSession } from 'next-auth/react';

const Landing = () => {

    const { darkTheme } = useThemeContext();

    const { status } = useSession();

  return (
    <Box className=' flex flex-col md:flex-row absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Box className='flex justify-center md:items-center m-16'>
            <Button variant="outline" size='4'>
                <Link
                    href={status === 'authenticated' ? '/dashboard' : '/api/auth/signin' }
                >
                    Get Started
                </Link>
            </Button>
        </Box>
        <Image
            src={darkTheme ? darkThemeLanding : lightThemeLanding}
            alt=''
            width={640}
            height={370}
            className='shrink'
        />
    </Box>
  )
}

export default Landing;