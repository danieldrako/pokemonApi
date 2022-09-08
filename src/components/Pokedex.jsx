import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from './Pokedex/PokemonCard'
import SearchInput from './Pokedex/SearchInput'
import SelectType from './Pokedex/SelectType'
import HeaderPoke from './shared/HeaderPoke'
import './styles/pokedex.css'
import {motion} from 'framer-motion'
const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [optionType, setOptionType] = useState('All')

  useEffect(() => {
    if(optionType !== 'All'){
      // Aquí se hace la lógica de cuando el usuario quieres filtrar por tipo
      const URL = `https://pokeapi.co/api/v2/type/${optionType}/`
      axios.get(URL)
        .then(res => {
          const arr = res.data.pokemon.map(e => e.pokemon)
          setPokemons({results: arr})
        })
        .catch(err => console.log(err))
    } else if(pokeSearch){
      // Aquí se hace la lógica cuando el usuario busca por el input
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`

      const obj = {
        results: [{url}]
      }
      setPokemons(obj)
    } else {
      // Aquí se hace la lógica cuando el usuario quiere todos los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon'
      axios.get(URL)
        .then(res => setPokemons(res.data))
        .catch(err => console.log(err))
    }
  }, [pokeSearch, optionType])

  const nameTrainer = useSelector(state => state.nameTrainer)
const containerVariants = {
  hidden: {
    opacity:0,
    y:'50vh',
  },
  show: {
    opacity: 1,
    y:0,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}
  return (
    <motion.div variants={ containerVariants } initial= 'hidden' animate='show'>
      <HeaderPoke />
      <h1 className='title'>Welcome {nameTrainer}, Catch them all.</h1>
      <SearchInput setPokeSearch={setPokeSearch} setOptionType={setOptionType} />
      <SelectType 
        optionType={optionType} 
        setOptionType={setOptionType} 
        setPokeSearch={setPokeSearch}
      />
      <div className='cards-container'>
        {
          pokemons?.results.map(pokemon => (
            <PokemonCard 
              key={pokemon.url}
              url={pokemon.url}
            />
          ))
        }
      </div>
    </motion.div>
  )
}

export default Pokedex