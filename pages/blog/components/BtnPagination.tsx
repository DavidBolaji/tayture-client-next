// BtnPagination.tsx
import React from 'react';

interface BtnPaginationProps {
    page_num: number;
    isActive: boolean;
    onClick: () => void;
}

function BtnPagination({ page_num, isActive, onClick }: BtnPaginationProps) {
    return (
        <span onClick={onClick} className={`inline-flex w-11 h-11 items-center justify-center rounded-full focus:outline-none ${isActive ? 'bg-black text-white' : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000'}`}>
            {page_num}
        </span>
    );
}

export default BtnPagination;