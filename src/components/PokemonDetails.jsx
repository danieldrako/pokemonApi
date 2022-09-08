import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/pokemondetails.css'
import { motion } from 'framer-motion'
import TypeWriterEffect from 'react-typewriter-effect';

const PokemonDetails = () => {

  const [pokeInfo, setPokeInfo] = useState()

  const {name} = useParams()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`
    axios.get(URL)
    .then(res => setPokeInfo(res.data))
    .catch(err => console.log(err))
  }, [])
  

const abilities = pokeInfo?.abilities
const stats = pokeInfo?.stats

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
    <motion.article className='details' variants={ containerVariants } initial= 'hidden' animate='show'>
       <h1 className='details__name'>
       <TypeWriterEffect 
        textStyle={{
          color: '#207DE5',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          margin: '40px 15px'
        }}
        startDelay={1000}
        cursorColor="rgb(18,18,19)"
        multiText={[
          `${name}`
        ]}
        multiTextDelay={9000}
        typeSpeed={100}
        multiTextLoop
      />
        </h1>

      <div className='details__img'>
      <motion.img src={pokeInfo?.sprites.other.home.front_default} alt=""
      initial={ {y: 6}}
      animate ={{
        y:-6,
        transition:{
          duration:1,
          ease: 'easeIn',
          repeat: Infinity,
          repeatType: 'reverse'
        }
      }}
      />
      </div>
      
      <motion.h2
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
      >Habilities</motion.h2>
       <motion.div 
       initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ duration: 0.8 }}
       
       className='details__abilities'>
        {
          abilities?.map(item=> <p key={item.ability.name}>{ `${item.ability.name}`}</p> )
        }
      </motion.div>

      <motion.h2
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
      >Statistics</motion.h2> 
      <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className='details__stats'>
        {
          stats?.map(item=> <p key={item.stat.name} >
             { `${item.stat.name}: ${item['base_stat']}`}
            
            </p> )
        }

        
      </motion.div> 
      <h2>Moves</h2> 
      <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className='details__moves'>
        {
          pokeInfo?.moves.map(item=> <div 
            className='details__moves-item' key={item.move.name} >{ ` ${item.move.name}`}</div> )
        }
      </motion.div> 
     
    </motion.article>
  )
}

export default PokemonDetails