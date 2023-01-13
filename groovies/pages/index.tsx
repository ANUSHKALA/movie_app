import type { NextPage } from 'next'
import Card from "../components/Card";
import React, {useEffect, useState} from "react";
import AppView from "../components/AppView";


export async function getServerSideProps(context){
    let data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0").then(res => res.json()).then(res => res.results)
    if(context.query?.keyword)
        data = data.filter(pokemon => pokemon.name.toLowerCase().startsWith(context.query.keyword.toLowerCase()));
    const pokemons = await Promise.all(data.map(async (pokemon) => await fetch(pokemon.url).then(res => res.json())));
    return{
        props: {
            pokemons
        }
    }
}

const Home: NextPage = ({ pokemons }) => {
    return (
        <div>
            <AppView title='Pokedex' pageType="">

                <div className="flex flex-wrap justify-center mx-auto mt-5 ">
                    {pokemons.map((el:any,index:number) => {
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