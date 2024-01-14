'use client';

import { Flex, Text, Button } from '@radix-ui/themes';
import React from 'react';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    itemCount: number, 
    itemsPerPage: number,
    currentPage: number 
}

const Pagination = ({ itemCount, itemsPerPage, currentPage }: Props) => {

    const router = useRouter();

    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / itemsPerPage);

    if(pageCount <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

    return (
        <Flex align='center' gap='2'>
            <Text size='2'>
                Page {currentPage} of {pageCount}
            </Text>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === 1}
                onClick={() => changePage(1)}
            >
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
            >
                <ChevronLeftIcon />
            </Button>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === pageCount}
                onClick={() => changePage(pageCount)}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination;