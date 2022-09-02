import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from "../components/Card";
import {useEffect, useState} from "react";
import {number} from "prop-types";


export async function getServerSideProps(){
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50 0&offset=0")
    const resJ = await res.json();
    const rel = resJ.results;

    (resJ.results).map(async (el: {}, index: number) => {
        // @ts-ignore
        const rs = await fetch("https://pokeapi.co/api/v2/pokemon/" + el.name + "/");
        const rsj = await rs.json();
        console.log(rsj)
        rel.push(rsj);
    })

    return{
        props: {rel}
    }
}

const Home: NextPage = (props) => {

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
        console.log(search);

    }

    return (
    <div className={styles.container}>
      <Head>
        <title>POKEDEX APP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <div className="bg-gray-700 w-screen justify-items-center pb-3 h-fit grid">
              <h1 className={styles.title}>
                  POKEDEX
              </h1>
              <div>
                  <form>
                      <input className="justify-center my-3" onChange={handleChange}/>
                  </form>
              </div>
          </div>
          <div className="flex flex-wrap">

              {    // @ts-ignore
                  data
                      .filter(info =>
                        info.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((el:any,index:number) => {
                      console.log(el.types[0].type.name)
                      let t: String = el.types[0].type.name;
                      let c: String = "";
                      let abArr:[] = [];
                      el.abilities.map((el:{},index:number) => {
                          // @ts-ignore
                          abArr.push(el.ability.name);
                      })
                          // console.log(abArr)
                  return(
                      <div key={index} className="mx-3 w-40 rounded-xl my-2 bg-gray-700">
                          <
                              // @ts-ignore
                              Card name={el.name} image={el.sprites.other.dream_world.front_default} type={el.types[0].type.name} abilitiesArray={abArr}  height={el.height} weight={el.weight} />
                      </div>
                  )
              })

              }
          </div>
      </main>
    </div>
  )
}

export default Home
