import type { NextPage } from 'next'
import Head from 'next/head'
import Card from "../components/Card";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import AppView from "../components/AppView";


export async function getServerSideProps(){
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0")
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

    return (
        <div>

            <AppView title='Pokedex'>

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
                                    <div key={index} className={""}>
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