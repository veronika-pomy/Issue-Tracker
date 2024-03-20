'use client';

import React from 'react'
import NavBar from './NavBar';
import { Container, Theme } from '@radix-ui/themes';
import { useThemeContext } from './context/useThemeContext';

const AppContainer = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    const { darkTheme } = useThemeContext();

  return (
    <>
        <Theme 
                accentColor={darkTheme ? 'cyan' : 'violet'}
                grayColor='slate'
                appearance={darkTheme ? 'dark' : 'light'}
        >
            <NavBar />
            <main className='p-5'>
                <Container>
                    {children}
                </Container>
            </main>
        </Theme>
    </>
  )
}

export default AppContainer;