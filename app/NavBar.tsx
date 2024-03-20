'use client';

import { Skeleton } from '@/app/components';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { useThemeContext } from './context/useThemeContext';

const NavBar = () => {

    const { darkTheme } = useThemeContext();

  return (
    <nav className='border-b mb-5 px-5 py-3.5'>
        <Container>
            <Flex justify='between'>
                <Flex align='center' gap='3'>
                    <Link href='/' className={`text-2xl ${ darkTheme ? 'text-cyan-300' : 'text-violet-900' } `}>
                        <HiOutlineWrenchScrewdriver />
                    </Link>
                    <NavLinks />
                </Flex>
                <Flex gap='5'>
                    <ThemeBtn />
                    <AuthStatus />
                </Flex>
            </Flex>
        </Container>
    </nav>
  );
};

const NavLinks = () => {

    const links = [
        { label: 'Dashboard', href:'/' },
        { label: 'Issues', href:'/issues/list'}
    ];

    const currentPath = usePathname();

    const { darkTheme } = useThemeContext();

    return (
        <ul className='flex space-x-6'>
            {links.map(link => 
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={classnames({
                            'nav-link': true && !darkTheme,   
                            'nav-link-dark': true && darkTheme,  
                            '!text-violet-900': currentPath === link.href && !darkTheme,
                            '!text-cyan-300': currentPath === link.href && darkTheme,
                        })}
                    >
                        {link.label}
                    </Link>
                </li>
            )}
        </ul>
    )
};

const AuthStatus = () => {

    const { status, data: session } = useSession();

    if (status === 'loading') 
        return <Skeleton width='3rem' />;

    if (status === 'unauthenticated') 
        return  <Link className='nav-link' href='/api/auth/signin'>Sign In</Link>

        return (
            <Box>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar 
                            src={session!.user!.image!} 
                            fallback='?' 
                            size='2' 
                            radius='full' 
                            className='cursor-pointer'
                            referrerPolicy='no-referrer'
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>
                            <Text size='2'>{session!.user!.email}</Text>
                        </DropdownMenu.Label>
                        <DropdownMenu.Item><Link href='/api/auth/signout'>Sign Out</Link></DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
        </Box>
    )
};

const ThemeBtn = () => {

    const { darkTheme, toggleTheme } = useThemeContext();

    return (
      <button onClick={toggleTheme} type='button' >
        { darkTheme ? 
            <SunIcon className='w-5 h-5 text-zinc-400 hover:text-cyan-300 ' />
        :
            <MoonIcon className='w-5 h-5 text-zinc-600 hover:text-violet-900 ' />
        }
      </button>
    )
  };

export default NavBar;