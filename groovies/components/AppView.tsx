import Head from 'next/head';
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";

const l = ['Normal','Fire','Water','Grass','Electric','Ice','Poison','Fighting','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy']

const AppView = ({children, title, pageType}) => {
    const router = useRouter();

    const [selectState, setSelectState] = useState(false)
    const [keyword, setKeyword] = useState(router?.query?.keyword);


    const onClick = () => {
        setSelectState(true)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/?keyword=${keyword}`);
    };

    return(

        <React.Fragment>
            <div className='drop-shadow-lg shadow-slate-900'>
                <img src='/bgimg.jpg' className='w-screen h-7 object-cover'/>
            </div>
            <div className='flex items-center justify-items-stretch'>
                <Link href="/">
                    <img src='/pokedex.png' className='h-14 px-5'/>
                </Link>
                <form onSubmit={handleSearch}>
                    <input
                        id="searchInput"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search pokemons'
                        className='border rounded-3xl border-gray-700 block w-full h-8 mx-4 my-2 px-4'
                    />
                </form>

            </div>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='flex flex-wrap justify-center'>
                <ul className="flex  text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li onClick={onClick} className="mx-2 my-2">
                        <Link href='/'>
                            <a className={pageType?
                                "inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white hover:text-white"
                                :
                                "inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white bg-amber-400 "}>
                                All
                            </a>
                        </Link>
                    </li>
                    {l.map((el:string,index:number) => {
                            return(
                                <li onClick={onClick} className="mx-2 my-2">
                                    <Link
                                        href={`/types/${el.toLowerCase()}`}
                                    >
                                        <a className={pageType==el.toLowerCase()?
                                            "inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white bg-amber-400"
                                            :
                                            " inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"}>
                                            {el}
                                        </a>
                                    </Link>
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
            {children}
        </React.Fragment>

    )
}



export default AppView;