import type { NextPage } from 'next'
import Card from "../components/Card";
import React, {useEffect, useState} from "react";
import AppView from "../components/AppView";
import Pagination from "../components/Pagination";
import PokemonLister from "../components/PokemonLister";


export async function getServerSideProps(context){
    const limit = 60;
    const pageNumber = context.query?.page || 0;
    let allData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=500&offset=${pageNumber*limit}`).then(res => res.json())
    console.log("allData \n",allData["results"])
    if(context.query?.keyword)
        allData["results"] = allData["results"].filter(pokemon => pokemon.name.toLowerCase().startsWith(context.query.keyword.toLowerCase()));
    const pokemons = await Promise.all(allData["results"].map(async (pokemon) => await fetch(pokemon.url).then(res => res.json())));
    return{
        props: {
            pokemons,
            count: allData?.count
        }
    }
}

const Home: NextPage = (

    { // @ts-ignore
        pokemons, count
    }
    ) => {

    const [currentPage,setCurrentPage] = useState(1);
    const pageSize = 50;

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div>
            <AppView title='Pokedex' pageType="" data={[count,currentPage, 50]}>
                <PokemonLister pokemons={pokemons}/>
            </AppView>
        </div>
  )
}

export default Home