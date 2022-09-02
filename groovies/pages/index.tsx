import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from "../components/Card";
import {useEffect, useState} from "react";
import {number} from "prop-types";


const types = new Map();
types.set("normal","slate-300")
types.set("fire","amber-500")
types.set("water","cyan-400")
types.set("grass","lime-600")
types.set("electric","yellow-400")
types.set("ice","teal-100")
types.set("fighting","rose-800")
types.set("poison","fuchsia-800")
types.set("ground","yellow-200")
types.set("flying","violet-300")
types.set("psychic","pink-400")
types.set("bug","lime-500")
types.set("ghost","violet-900")
types.set("rock","slate-900")
types.set("dragon","cyan-800")
types.set("steel","zinc-400")
types.set("fairy","rose-200")


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
        (props.rel).map((el:{},index:number) => {
            fetch(el.url)
                .then(res => res.json())
                .then(res => setData((pre) => [...pre,res]))
        })
    }

    useEffect(fetchPokemon,[])

    // console.log(data)

    function handleChange(e: React.FormEvent<HTMLInputElement>) {

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
                          abArr.push(el.ability.name);
                      })
                          console.log(abArr)
                      if(types.has(t)){
                        c = ""+types.get(t)
                      }
                  return(
                      <div key={index} className="mx-3 w-40 rounded-xl my-2 bg-gray-700">
                          <Card name={el.name} image={el.sprites.other.dream_world.front_default} type={el.types[0].type.name} abilitiesArray={abArr}  height={el.height} weight={el.weight}/>
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
