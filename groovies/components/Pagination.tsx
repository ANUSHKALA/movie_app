import {useState} from "react";

const Pagination = ({ totalCount, currentPage, pageSize, onPageChange }) => {

    const pagesCount = Math.ceil(totalCount / pageSize);

    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    console.log(pagesCount)
    console.log(pages)
    return(
        <div>
            gvhfg
            <ul className='flex flex-wrap justify-center'>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            page === currentPage ? "inline-block py-3 px-4 mx-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white hover:text-white bg-amber-400" : "inline-block py-3 px-4 mx-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white "
                        }
                    >
                        <a onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return(items.slice(startIndex, startIndex + pageSize));
}

export default Pagination;