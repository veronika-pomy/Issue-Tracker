import { Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';
import { Box } from '@radix-ui/themes';

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if(!children) return null; // client-side validation error handling
    return (    
        <Box>
            <Text color='red' className='pl-3 bg-red-100 pt-2 pb-2 rounded-lg' as='p'>{children}</Text>
        </Box>
    )
}

export default ErrorMessage;