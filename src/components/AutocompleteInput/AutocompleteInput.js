// modules
import React, { useState, useRef } from 'react';
// hooks
import useOutsideClick from '../../hooks/useOutsideClick';
// styles
import styles from './styles.module.scss';
// cities
import { CITIES } from '../../data/cities';

const AutocompleteInput = ({
    inputValue,
    onInputChange,
    onCityClick
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);

    const ref = useRef();
    
    useOutsideClick(ref, () => {
        setShowSuggestions(false);
      });

    const handleChange = ({ target }) => {
        const userInput = target.value;
        const filteredSuggestionCitites = CITIES.filter(
            city =>
                city.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setShowSuggestions(true);
        setFilteredCities(filteredSuggestionCitites);
        onInputChange(userInput);
    }

    const handleClick = (e) => {
        onInputChange(e.currentTarget.innerText);
        setShowSuggestions(false);
        onCityClick(e, e.currentTarget.innerText);
    };

    const suggestionsListComponent = () => {
        if (showSuggestions && inputValue) {
            if (filteredCities.length) {
                return (
                    <ul class={styles.suggestions} ref={ref}>
                        {filteredCities.slice(0, 5).map((city, index) => {
                            return (
                                <li key={`${city.name}${city.country}`} onClick={handleClick}>
                                    {`${city.name}, ${city.country}`}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <div className={styles.noSuggestions} ref={ref}>
                        Sorry, but we don't have such city
                    </div>
                );
            }
        }
    }

    return (
        <>
            <input
                placeholder="Type location..."
                className={styles.input}
                value={inputValue}
                onChange={handleChange}
            />
            {suggestionsListComponent()}
        </>
    );
}

export default AutocompleteInput;
