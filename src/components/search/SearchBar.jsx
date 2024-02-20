import React, {useState} from 'react';
import "./SearchBar.css"

function Search ({setLocationHandler}) {
    const [request, setRequest]=useState('')

 function handleClick(){
        setLocationHandler(request);
 }
 function keyPressCheck(e){
        if (e.KeyCode===13){
            setLocationHandler(request)
        }
 }
    return(
        <span className"searchbar">
            <input
                type="text"
                name="search"
                value={request}
                onChange={(e)=>setRequest(e.target.value)}
onKeyUp={keyPressCheck}
                placeholder="zoek een locatie"
                className="searchbar-entry"/>
            <button
                type="button"
                onClick={handleClick}
                className="searchbar-button"
                >zoek</button>
        </span>
    )
}
export default Search

