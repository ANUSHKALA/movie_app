import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import React, { useState, useEffect } from 'react';
import Axios from "axios"


export default function App(){

    const[data, setData] = useState(null);

    useEffect(
        () => {
            Axios.get("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
        },[]
    );

    
    return(
        <div>
            < Navbar />
            <div className= "heading">
            <center>
                <h1>Groovies</h1>
                <p>{data}</p>
            </center>
            </div>
            < SearchBar />
        </div>
    )
}