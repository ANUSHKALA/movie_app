import type { NextPage } from 'next'
import Card from "../components/Card";
import React, {useEffect, useState} from "react";
import AppView from "../components/AppView";
import Pagination, {paginate} from "../components/Pagination";


export async function getServerSideProps(context){
    const limit = 60;
    console.log(context.query)
    const pageNumber = context.query?.page || 0;
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${pageNumber*limit}`).then(res => res.json())
    if(context.query?.keyword)
        data = data['results'].filter(pokemon => pokemon.name.toLowerCase().startsWith(context.query.keyword.toLowerCase()));
    const pokemons = await Promise.all(data['results'].map(async (pokemon) => await fetch(pokemon.url).then(res => res.json())));
    return{
        props: {
            pokemons,
            count: data?.count
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
                <Pagination totalCount={count} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange}/>
            </AppView>
        </div>
  )
}

export default Home