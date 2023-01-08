import type { NextPage } from 'next'
import Head from 'next/head'
import Card from "../components/Card";
import {useEffect, useState} from "react";
import Link from "next/link";
import AppView from "../components/AppView";


export async function getServerSideProps(){
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
    const resJ = await res.json();
    const rel = resJ.results;
    return{
        props: {rel}
    }
}

const Home: NextPage = (props) => {

    // console.log(props);
    const [data,setData] = useState([]);
    const [search,setSearch] = useState("");
    const fetchPokemon = () => {
        setData([]);
        // @ts-ignore
        (props.rel).map((el:{},index:number) => {
            // @ts-ignore
            fetch(el.url)
                .then(res => res.json())
                .then(res => setData((pre) => [...pre,res]))
        })
    }

    useEffect(fetchPokemon,[])

    // console.log(data)

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        // @ts-ignore
        setSearch(e.target.value);

    }

    const l = ['Normal','Fire','Water','Grass','Electric','Ice','Poison','Fighting','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy']

    return (
        <div>

            <AppView title='Pokedex'>

                <div className='flex justify-center'>


                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        {l.map((el:string,index:number) => {
                                return(
                                    <li className="">
                                        <a
                                            href={`/types/${el.toLowerCase()}`}
                                            className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                                        >
                                            {el}
                                        </a>
                                    </li>
                                )
                            }
                        )}
                        <li>
                            <a
                                href='/'
                                className="inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                All
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-wrap justify-center mx-auto mt-5 ">
                    {    // @ts-ignore
                        data
                            .filter(info =>
                                info.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((el:any,index:number) => {
                                let abArr:[] = [];
                                el.abilities.map((el:{},index:number) => {
                                    // @ts-ignore
                                    abArr.push(el.ability.name);
                                })
                                return(
                                    <div key={index} className="mx-3 w-40 rounded-xl my-2 bg-slate-200 overflow-hidden">
                                        <Card
                                            name={el.name}
                                            id={el.id}
                                            // @ts-ignore
                                            image={
                                                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+el.id+".gif"
                                            }
                                            type={el.types[0].type.name}
                                            abilitiesArray={abArr}
                                            height={el.height}
                                            weight={el.weight}
                                        />
                                    </div>
                                )
                            })}
                </div>
            </AppView>
        </div>
  )
}

export default Home