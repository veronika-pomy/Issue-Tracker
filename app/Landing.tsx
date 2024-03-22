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
    <Box className='flex flex-col md:flex-row justify-between mt-28 gap-40 w-10/12'>
        <Box className='flex justify-center md:items-center ml-20 md:ml-0'>
            <Button variant="outline" size='4' className='w-60 h-16'>
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
            width={940}
            className='shrink ml-16 sm:ml-20 md:ml-0'
        />
    </Box>
  )
}

export default Landing;