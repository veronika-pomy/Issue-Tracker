'use client';

import React from 'react'
import NavBar from './NavBar';
import { Box, Container, Theme } from '@radix-ui/themes';
import { useThemeContext } from './context/useThemeContext';

const AppContainer = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    const { darkTheme } = useThemeContext();

  return (
    <Box>
        <Theme 
                accentColor={darkTheme ? 'cyan' : 'violet'}
                grayColor='slate'
                appearance={darkTheme ? 'dark' : 'light'}
        >
            <NavBar />
            <main>
                <Container>
                    {children}
                </Container>
            </main>
        </Theme>
    </Box>
  )
}

export default AppContainer;