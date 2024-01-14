import { Flex, Text, Button } from '@radix-ui/themes';
import React from 'react';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

interface Props {
    itemCount: number, 
    itemsPerPage: number,
    currentPage: number 
}

const Pagination = ({ itemCount, itemsPerPage, currentPage }: Props) => {

    const pageCount = Math.ceil(itemCount / itemsPerPage);

    if(pageCount < 1) return null;

    return (
        <Flex align='center' gap='2'>
            <Text size='2'>
                Page {currentPage} of {pageCount}
            </Text>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === 1}
            >
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon />
            </Button>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === pageCount}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === pageCount}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination;