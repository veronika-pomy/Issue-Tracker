'use client';

import React, { useContext, useState } from 'react';

export const ThemeContext = React.createContext();

export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider ({children}) {
    
    const [ darkTheme, setDarkTheme ] = useState(false);

    const toggleTheme = () => {
        return setDarkTheme((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};