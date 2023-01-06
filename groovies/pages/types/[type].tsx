// @ts-ignore

import AppView from "../../components/AppView";

export const getServerSideProps = async (context) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`).then(res => res.json()).then(res => res.results)
    if(data?.find(pokemon => pokemon.name === context.params.slug)){
        const pokemonUrl = data.find(pokemon => pokemon.name === context.params.type).url;
        const pokemon = await fetch(pokemonUrl).then(res => res.json())
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


const TypePage = () => {
    return(
        <AppView title=''>

        </AppView>
    )
}




export default TypePage;