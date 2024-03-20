import { Box, Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';
import { useThemeContext } from '../context/useThemeContext';

const ErrorMessage = ({ children }: PropsWithChildren) => {
    
    const { darkTheme } = useThemeContext();

    if(!children) return null; // client-side validation error handling

    return (    
        <Box>
            <Text color={darkTheme ? 'cyan' : 'red'} className={`pl-3 ${darkTheme ? '' : 'bg-red-100'} pt-2 pb-2 rounded-lg`} as='p'>{children}</Text>
        </Box>
    )
}

export default ErrorMessage;