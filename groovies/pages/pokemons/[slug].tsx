import Head from 'next/head';
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import {useEffect, useState} from "react";
import AppView from "../../components/AppView";

export async function getServerSideProps(context) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
        .then(res => res.json())
        .then(res =>  res.results)
    console.log(data)

    if(data?.find(pokemon => pokemon.name === context.params.slug)){
        const pokemonUrl = data.find(pokemon => pokemon.name === context.params.slug).url;
        console.log(pokemonUrl)
        const pokemon = await fetch(pokemonUrl).then(res => res.json())
        console.log(pokemon)
        return {
            props: {
                pokemon
            }
        }
    }
    else {
        return {
            notFound: true
        }
    }
}


const PokePage = (props) => {

    console.log(props.pokemon)

    const abilities = props.pokemon.abilities.map((el:{},index:number) => {
        return(
            // @ts-ignore
            el.ability.name
        )
    })
    console.log(abilities)
    return(
        <div>
            {/*<AppView title='gj'></AppView>*/}
            <main className={styles.pokepage}>
                <div className="bg-gray-400 w-screen justify-items-center pb-7 h-fit grid">
                    <h1 className="text-6xl mt-7 text-gray-700 font-bold">
                        <Link href="/">
                            POKEDEX
                        </Link>
                    </h1>
                </div>
                <div className="bg-gray-300 p-3 mx-auto my-auto rounded-2xl h-100">
                    <h1 className="text-center text-gray-800 text-5xl capitalize px-auto py-10">
                        {props.pokemon.name}
                    </h1>
                    <div className="mx-auto">
                        <    // @ts-ignore
                            img src={props.pokemon.sprites.other.dream_world.front_default} className="mx-auto"/>
                    </div>
                    <div className="ml-4 my-auto pl-30 text-2xl pt-3 text-gray-700 capitalize">
                        <br/>
                        Weight: { props.pokemon.weight}
                        <br />
                        Height: {props.pokemon.height}
                        <br />
                        Type: {props.pokemon.types[0].type.name}
                        <br />
                        Abilities: {abilities + " "}
                    </div>
                </div>
            </main>
        </div>
    )}

export default PokePage;