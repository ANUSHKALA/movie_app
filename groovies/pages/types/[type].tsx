// @ts-ignore

import {useEffect, useState} from "react";
import Card from "../../components/Card";
import AppView from "../../components/AppView";

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
                        <div key={index} className="">
                            <Card
                                name={el.name}
                                // @ts-ignore
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