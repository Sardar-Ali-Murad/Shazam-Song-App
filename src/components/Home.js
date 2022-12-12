import React from 'react'
// import SideBar from './SideBar.js'
import { useRef } from 'react'
import SideBar from './SideBar'
import "./Home.css"
import {options} from "../utils"
import FormRowSelect from "./FormRowSelect"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom"
import TopSection from './TopSection'
import Button from '@mui/material/Button';

import FormRow from "./FormRow"

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


const Home = () => {
    let [singleGenreArray,setSingleGenreArray]=React.useState([])
    let [currentGenre,setCurrentGenre]=React.useState("POP")

    // let [homeChart,setHomeChart]=React.useState(true)

    let [search,setSearch]=React.useState("")
   


    let list=["POP","HIP_HOP_RAP","DANCE","ELECTRONIC","SOUL_RNB","ALTERNATIVE","ROCK","LATIN"]

    let [loading,setLoading]=React.useState(true)

    function handleChange(e){
        setCurrentGenre(e.target.value)
    }

    // function handleSearch(e){
    //     setSearch(e.target.value)
    // }

    React.useEffect(()=>{
      const start=async ()=>{
         setLoading(true)
           let genre=await fetch(`https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${currentGenre}`, options)
           let data=await genre.json()
           setSingleGenreArray(data)
           setLoading(false)
          }
          start()
          
    },[currentGenre])

  

    
    
    let [play,setPlay]=React.useState({
      isPlaying:false,
      audio:"",
      image:""
    })

    
    
    function cardHandler({image,audio}){
      setPlay(()=>{
        return{
          isPlaying:true,
          audio:audio,
          image:image
        }
      })
    }
    
   

    
  return (
    <div className='home__Main section__padding'>
      <div style={{display:"flex"}}>

         <SideBar/>
         

  </div>


         <div className='home__Section' >

          
        
           <div className='home__Charts'>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                  <Typography variant='h4'>Discover</Typography>
                  <FormRowSelect value={currentGenre} handleChange={handleChange} list={list} />
                </div>
            <div className='home__Info'>


                {
                  loading?<CircularProgress/>: singleGenreArray?.map((song)=>{
                        return (

                          <Card style={{cursor:"pointer"}} onClick={()=>cardHandler({image:song?.share?.image,audio:song?.hub?.actions[1].uri})} className='home__Card' sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={song?.share?.image}
                          alt="green iguana"
                          />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                             {song?.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {song?.subtitle}
                          </Typography>
                        </CardContent>
                        
                      <Link to={`/Track/${song?.key}`}>
                         <Button style={{marginLeft:"10px",marginBottom:"10px"}} variant="outlined">See More</Button>
                      </Link>
                      </Card>
                    )
                    
                    
                  })
                }
            </div>
                    {/* Tops Start */}
         
                </div>
         {/* Tops Ends */}

          <TopSection image={play.image} audio={play.audio}/>


         </div>
    </div>
  )
}

export default Home
