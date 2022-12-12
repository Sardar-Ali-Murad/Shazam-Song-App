import React from 'react'
// import SideBar from './SideBar.js'
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



const AroundYou = () => {
    let [Around,setAround]=React.useState([])    
    let [loading,setLoading]=React.useState(true)
    let [currentCountry,setCurrentCountry]=React.useState("US")

          
    let list=["DE","PT","DK","HR","UA","HU","MA","ID","IE","US","EG","IL","UY","IN","ZA","IT","MX","MY","ES","VE","AR","AT","AU","RO","NL","NO","RU","BE","FI","BG","JP","FR","NZ","SA","BR","SE","SG","BY","GB","CA","CH","KR","CL","GR","CN","CO","KZ","CR","TH","PE","CZ","PL","TR"]

    React.useEffect(()=>{
      const start=async ()=>{
         setLoading(true)
        let data=await fetch(`https://shazam-core.p.rapidapi.com/v1/charts/country?country_code=${currentCountry}`, options)
        let realData=await data.json()
        setAround(realData)
        setLoading(false)
        }
        start()

    },[currentCountry])
    console.log(Around)


    function handleChange(e){
        setCurrentCountry(e.target.value)
    }

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
         <SideBar/>
         <div className='home__Section' >
         

         {/* Home Charts Starts */}
            <div className='home__Charts'>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                  <Typography variant='h4'>Around You</Typography>
                  <FormRowSelect value={currentCountry} handleChange={handleChange} list={list} />
                </div>
            <div className='home__Info'>
                {
                  loading?<CircularProgress/>: Around.map((song)=>{
                        return (

                           
                          <Card style={{cursor:"pointer"}} onClick={()=>cardHandler({image:song?.share?.image,audio:song?.hub?.actions[1].uri})}  className='home__Card' sx={{ maxWidth: 345 }}>
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
       </div>
       {/* Home Charts Ends */}
       
       
       

                    {/* Tops Start */}
         
                    <TopSection image={play.image} audio={play.audio}/>
         {/* Tops Ends */}



         </div>
    </div>
  )
}

export default AroundYou
