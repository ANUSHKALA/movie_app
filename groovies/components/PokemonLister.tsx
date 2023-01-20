import type { NextPage } from 'next'
import Card from "../components/Card";
import React, {useEffect, useState} from "react";
import AppView from "../components/AppView";
import Pagination from "../components/Pagination";

const PokemonLister = (props) => {

    return (
        <div className="flex flex-wrap justify-center mx-auto mt-5 ">
            {props.pokemons.map((el:any,index:number) => {
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
    )
}

export default PokemonLister;