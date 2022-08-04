import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

export default function App(){
    return(
        <div>
            < Navbar />
            <div className= "heading">
            <center>
                <h1>Groovies</h1>
            </center>
            </div>
            < SearchBar />
        </div>
    )
}