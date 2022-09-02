import Head from "next/head";
import Link from "next/link";
import React from "react";


type CardProps = {
    name: String,
    image: String,
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

    function colourCard(){
        let bc:String = "stone-800";
        // @ts-ignore
        let color:String = props.i.type;

        if(types.has(color)){
            bc = types.get(color)
            console.log(bc)

        }
        else{
            bc = "stone-800"
        }
        const tc:any = " bg-"+bc
        return tc;
    }
    console.log(props.abilitiesArray)

    return(
        <div className="py-5 mx-3 my-5">
            <div className="h-40 w-50" >
                <div className="h-24">
                    <img className="mx-auto py-3 px-1 "
                        // @ts-ignore
                         src={props.image}
                         alt="Probably a pokemon"
                         width="100px"
                         height="100px"
                    />
                </div>
                <h5 className="mh-3 my-5 text-center text-xl font-bold tracking-tight dark:text-white capitalize">{(props.name)}</h5>
                <div className="justify-center">
                    <Link href={{
                        pathname:'/PokePage',

                         query:{
                            // @ts-ignore
                            name:props.name,
                            // @ts-ignore
                            image:props.image,
                            // @ts-ignore
                            about:Object(props.abilitiesArray),
                            // @ts-ignore
                            h:Number(props.height),
                            // @ts-ignore
                            w:Number(props.weight),
                            // @ts-ignore
                            type: props.type,
                        }
                    }}>
                        <button type="button" className="bg-gray-800 hover:bg-black text-white font-semibold hover:text-white px-12 border border-black hover:border-transparent rounded">
                            View
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Card;

