'use client';

import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes'

const NavBar = () => {

    const { status, data: session } = useSession();

    const links = [
        { label: 'Dashboard', href:'/' },
        { label: 'Issues', href:'/issues/list'}
    ]

    const currentPath = usePathname();

  return (
    <nav className='flex h-14 space-x-6 border-b mb-5 px-5 items-center'>
        <Link href='/' className='text-2xl text-purple-950'>
            <HiOutlineWrenchScrewdriver />
        </Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={classnames({   
                                'text-zinc-600': currentPath !== link.href,
                                'text-purple-950': currentPath === link.href,
                                'hover:text-zinc-950 transition-colors': true
                        })}
                    >
                        {link.label}
                    </Link>
                </li>
            )}
        </ul>
        <Box>
            {status === 'unauthenticated' && <Link href='/api/auth/signin'>Sign In</Link>}
            {status === 'authenticated' && <Link href='/api/auth/signout'>Sign Out</Link>}
        </Box>
    </nav>
  )
}

export default NavBar;