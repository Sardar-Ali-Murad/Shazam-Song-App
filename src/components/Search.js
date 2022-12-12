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

// import FormRow from './FormRow'


const Home = () => {
  let [data,setData]=React.useState([])

    // let [homeChart,setHomeChart]=React.useState(true)

    let [search,setSearch]=React.useState("Let Me Down Slowly")
   



    let [loading,setLoading]=React.useState(true)



 

  

    React.useEffect(()=>{
      const start=async ()=>{
         setLoading(true)
           let genre=await fetch(`https://shazam-core.p.rapidapi.com/v1/search/multi?search_type=SONGS_ARTISTS&query=${search}&offset=10`, options)
           let data=await genre.json()
           console.log(data)
           setData(data?.tracks?.hits)
           setLoading(false)
          }
          start()
          
    },[search])

  

    
    
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

    function handleChange(e){
        setSearch(e.target.value)
    }
    
   

    
  return (
    <div className='home__Main section__padding'>
      <div style={{display:"flex"}}>

         <SideBar/>
         
              
             

     </div>


         <div className='home__Section' >

          
        
           <div className='home__Charts'>
                  <FormRow type="text" labelText="Search For The Song" value={search} handleChange={handleChange}/>
                  <div style={{display:"flex",justifyContent:"space-around"}}>
                     <Typography variant='h4'>Here Are The Result {search}</Typography>
                  </div>
            <div className='home__Info'>


                {
                  loading?<CircularProgress/>: data?.map((song)=>{
                        return (

                          <Card style={{cursor:"pointer"}} onClick={()=>cardHandler({image:song?.track?.share?.image,audio:song?.track?.hub?.actions[1].uri})} className='home__Card' sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={song?.track?.share?.image}
                          alt="green iguana"
                          />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                             {song?.track?.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {song?.track?.subtitle}
                          </Typography>
                        </CardContent>
                        
                      <Link to={`/Track/${song?.track?.key}`}>
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

