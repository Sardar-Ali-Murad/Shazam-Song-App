import React from 'react'
import {Link,useParams} from "react-router-dom"
import { options } from '../utils'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import SideBar from './SideBar';

const SingleArtist = () => {
  let {Id}=useParams()
  let [artistData,setArtistData]=React.useState({}) 
  let [loading,setLoading]=React.useState(true)

  React.useEffect(()=>{
    const start=async ()=>{
      setLoading(true)
      let data=await fetch(`https://shazam-core.p.rapidapi.com/v1/artists/details?artist_id=${Id}`, options)
      let realData=await data.json()
      setArtistData(realData)
      // console.log(realData)
      setLoading(false)
    }
    start()
  },[])

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
    <div style={{display:"flex"}}>
      <SideBar/>
      {
        loading? <CircularProgress />:
         <div style={{marginLeft:"40px"}}>

            <div style={{display:"flex",marginBottom:"40px"}}>
            {  <img  src={artistData?.artists[Id]?.attributes?.artwork?.url.replace('{w}', '500')
            .replace('{h}', '500')} style={{height:"100px",width:"100px",borderRadius:"50%",marginRight:"20px",marginBottom:"40px"}}/>}
                       <div>    
                         <Typography style={{marginTop:"40px"}} variant='h6'>{artistData?.artists[Id]?.attributes?.name}</Typography>
                     </div>
            </div>

            <div>
               {play.audio && <audio  src={play.audio} controls autoPlay/>}
               {play.image && <img src={play.image} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>}
           </div>
           

           <div>
              <Typography variant='h5' style={{marginBottom:"30px"}}>Related Songs</Typography>  
               {
                Object.values(artistData?.songs).map((all,i)=>{
                  return (
                
                    <div style={{display:"flex",marginBottom:"30px",cursor:'pointer'}} onClick={()=>cardHandler({image:all?.attributes?.artwork?.url.replace("{w}","200").replace("{h}","200"),audio:all?.attributes?.previews[0]?.url})} >

                       <img  style={{height:"100px",width:"100px",borderRadius:"50%",marginRight:"20px",marginBottom:"40px"}} src={all?.attributes?.artwork?.url.replace("{w}","200").replace("{h}","200")}/>
                       <div style={{marginTop:"30px"}}>
                           <Typography variant='h6'>{all?.attributes?.artistName}</Typography>                        
                           <Typography variant='h7'>{all?.attributes?.albumName}</Typography>                        
                          
                       </div>
                    </div>
  
                  )
                })
               }          
           </div>

         </div>
        
      }
    </div>
  )
}

export default SingleArtist
