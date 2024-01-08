'use client';

import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { useSession } from 'next-auth/react';
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from '@radix-ui/themes'

const NavBar = () => {
  return (
    <nav className='border-b mb-5 px-5 py-3'>
        <Container>
            <Flex justify='between'>
                <Flex align='center' gap='3'>
                    <Link href='/' className='text-2xl text-purple-950'>
                        <HiOutlineWrenchScrewdriver />
                    </Link>
                    <NavLinks />
                </Flex>
                <AuthStatus />
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

    return (
        <ul className='flex space-x-6'>
            {links.map(link => 
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={classnames({
                            'nav-link': true,   
                            '!text-purple-950': currentPath === link.href,
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

    if(status === 'loading') 
        return null;

    if(status === 'unauthenticated') 
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

export default NavBar;