import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";


const Pagination = ({ totalCount, pageSize, onPageChange }) => {

    const router = useRouter();

    const pagesCount = Math.ceil(totalCount / pageSize);
    const [currentPage, setCurrentPage] = useState(1);


    onPageChange = (page) => {
        setCurrentPage(page);
        router.push('/?page='+page);
    }

    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    console.log(pagesCount)
    console.log(pages)
    return(
        <div>
            <ul className='flex flex-wrap justify-center'>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            page === currentPage?
                                "inline-block py-3 px-4 mx-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white hover:text-white bg-amber-400"
                                :
                                "inline-block py-3 px-4 mx-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white "
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


export default Pagination;