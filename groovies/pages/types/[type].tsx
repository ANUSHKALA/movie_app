// @ts-ignore

import {useEffect, useState} from "react";
import Card from "../../components/Card";
import AppView from "../../components/AppView";

const l = ['normal','fire','water','grass','electric','ice','poison','fighting','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy','all']

export const getServerSideProps = async (context) => {
    let tp = context.params.type;
    const data = await fetch("https://pokeapi.co/api/v2/type/"+tp).then(res => res.json()).then(res => res.pokemon)

    return {
        props: {
            data
        }
    }

}


const TypePage = (props) => {
    // console.log(props.data)

    const [data,setData] = useState([]);

    const fetchPokemon = () => {
        setData([]);
        // @ts-ignore
        (props.data).map((el:{},index:number) => {
            // console.log(el.pokemon.name)
            // @ts-ignore
            fetch(el.pokemon.url)
                .then(res => res.json())
                .then(res => setData((pre) => [...pre,res]))
        })
    }

    useEffect(fetchPokemon,[])
    return(
        <AppView title={'Types'}>
            <div className="flex flex-wrap justify-center mx-auto mt-5 ">
                {data.map((el, index) => {
                    return (
                        <div className="mx-3 w-40 rounded-xl my-2 bg-slate-200 overflow-hidden">
                            <Card
                                name={el.name}
                                image={
                                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+el.id+".gif"
                                }
                            />
                        </div>
                    )
                })}
            </div>
        </AppView>
    )
}




export default TypePage;