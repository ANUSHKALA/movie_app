import Head from "next/head";
import Link from "next/link";
import React from "react";


type CardProps = {
    name: String,
    image: [],
    type: String,
    abilitiesArray: [],
    height: number,
    weight: number,
    children:React.ReactNode;
};

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


const Card = (props:CardProps) =>{

    // console.log(props.abilitiesArray)

    return(
        <div className="mx-3 text-center">

        <Link className='justify-center' href={{
            pathname:'/pokemons/[slug]'
        }
        }
              as={"/pokemons/"+props.name}>
            <button type="button" >
                <div className="">
                    <h5 className="mh-3 my-5 text-center text-xl font-bold text-gray-700 tracking-tight dark:text-white capitalize pt-2">{(props.name)}</h5>
                    <img className="mx-auto py-3 px-1 "
                        // @ts-ignore
                         src={props.image}
                         alt="Probably a pokemon"
                         width="100px"
                         height="100px"
                    />
                </div>
            </button>
        </Link>
        </div>

    )
}
export default Card;

