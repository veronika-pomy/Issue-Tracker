'use client';

import { Card } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import { useThemeContext } from '../../context/useThemeContext';

const IssueCard = ({ description }: { description: string }) => {

    const { darkTheme } = useThemeContext();

  return (
    <>
    <Card className={`prose max-w-full ${darkTheme ? 'text-white': ''}`}>
        <ReactMarkdown>{description}</ReactMarkdown>
    </Card>
    </>
  )
}

export default IssueCard;