import React, {useState} from 'react';

import "./Search.css"
import Button from "../button/Button.jsx";
import InputField from "../inputField/InputField.jsx";

function SearchBar({setLocationHandler}) {
    const [query, setQuery] = useState('');

    function handleClick() {
        setLocationHandler(query);
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setLocationHandler(query);

        }
        console.log('zoeken', query)
    }

    return (
        <span className="searchbar">
  <InputField
      type="text"
      name="search"
      placeholder="Zoek een locatie in Nederland"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyUp={keyPressCheck}
  />

      <Button
          className="searchbar-button"
          type="button"
          onClick={handleClick}
          text='Zoek'
      />
    </span>
    );
}

export default SearchBar;
