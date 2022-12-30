import Head from 'next/head';
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import {useEffect, useState} from "react";

export async function getStaticPaths() {

    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000 0&offset=0")
    const resj = await res.json()
    const results = resj.results.map((el: {}, index: number) => {
        // @ts-ignore
        return el.name;
    })

    const paths = results.map((el:String,index:number) => {
        return{
            params: {
                slug: el
            }
        }
    })
    return {
        paths: paths,
        fallback: false,
    }
}


export async function getStaticProps(context) {
    let resj = {}
    await fetch(`https://pokeapi.co/api/v2/pokemon/${context.params.slug}/`)
        ?.then(res => res.json())
        ?.then(res => {
            resj = res;
        })
    // const resj = await res.json()
    console.log(resj)
    // @ts-ignore
    return {
        props: {
            resj
        }
    }
}


const PokePage = (props) => {

    console.log(props)

    const abilities = props.resj.abilities.map((el:{},index:number) => {
        return(
            // @ts-ignore
            el.ability.name
        )
    })
    console.log(abilities)
    return(
        <div>
            <Head>
                <title>{props.resj.name}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                        {props.resj.name}
                    </h1>
                    <div className="mx-auto">
                        <    // @ts-ignore
                            img src={props.resj.sprites.other.dream_world.front_default} className="mx-auto"/>
                    </div>
                    <div className="ml-4 my-auto pl-30 text-2xl pt-3 text-gray-700 capitalize">
                        <br/>
                        Weight: { props.resj.weight}
                        <br />
                        Height: {props.resj.height}
                        <br />
                        Type: {props.resj.types[0].type.name}
                        <br />
                        Abilities: {abilities + " "}
                    </div>
                </div>
            </main>
        </div>
    )}

export default PokePage;