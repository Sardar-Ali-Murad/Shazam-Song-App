import React, { useRef } from 'react'
import {Link,useParams} from "react-router-dom"
import {options} from "../utils"
import Typography from '@mui/material/Typography';
import SideBar from './SideBar';
import CircularProgress from '@mui/material/CircularProgress';



const SingleTrack = () => {
    let [track,setTrack]=React.useState({})
    let [trackRelated,setTrackRelated]=React.useState([])
    let [loading,setLoading]=React.useState(true)
    let {trackId}=useParams()

    let [change,SetChange]=React.useState(false)


     React.useEffect(()=>{
         const start=async ()=>{
            setLoading(true)
            let track=await fetch(`https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${trackId}`, options)
            let trackData=await track.json()
            setTrack(trackData)
            //  console.log(trackData)

            let trackRelated=await fetch(`https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${trackId}`, options)
            
         let data=await trackRelated.json()
         setTrackRelated(data)
         setLoading(false)
        }
        start()
    },[change])

    let image=useRef()

    function handleRef({song}){
        image.current.scrollIntoView({behavior:"smooth"})
        SetChange((pre)=>!pre)
        cardHandler({image:song?.share?.image,audio:song?.hub?.actions[1].uri})
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



    //  console.log(track.artists[0].adamid)
  return (
    <div style={{display:"flex"}} >
          <SideBar/>
          <div className='track__Main' style={{marginTop:"30px",marginLeft:"30px"}}>
            <div ref={image}></div>
                
                     
            { loading?<CircularProgress/> :  <div  style={{display:"flex",marginBottom:'40px'}}>
                     { track?.share?.image &&  <img src={track?.share?.image} style={{height:"100px",width:"100px",borderRadius:"50%",marginRight:"20px"}}/>}
                       <div>
                          <Typography style={{color:"gray"}} variant='h4'>{track?.title}</Typography>
                          
                          <Link style={{color:"black"}} to={`/Artist/${track?.artists[0]?.adamid}`}>
                            <Typography variant='h6' style={{cursor:"pointer"}}>{track?.subtitle}</Typography>
                          </Link>


                         <Typography variant='h7'>{track?.genres?.primary}</Typography>
                      </div>
                </div>
           }

           
           <div>
               {play.audio && <audio  src={play.audio} controls autoPlay/>}
               {play.image && <img src={play.image} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>}
           </div>
  

                <div className='lyrics' style={{display:"flex",flexDirection:"column",marginTop:"30px"}}>
                    <Typography variant='h3' style={{marginBottom:"30px",marginTop:"30px"}}>Lyrics</Typography>
                     {
                      loading?<CircularProgress/>:track?.sections[1]?.text?.map((all)=>{
                          return    <Typography style={{marginBottom:"16px"}} variant="h7">{all}</Typography>
                            
                        })
                     }
                </div>

                <div className='Related__Songs'>
                     <Typography variant="h3" style={{marginBottom:"30px",marginTop:"30px"}}>Related Songs</Typography>
                     {trackRelated.slice(0,5).map((all,i)=>{
                return(
                    <Link style={{color:"black"}} to={`/Track/${all?.key}`}>
                    <div onClick={()=>handleRef({song:all})} style={{display:"flex",marginBottom:"30px",cursor:"pointer"}}>
                    <p>{i+1}.</p>
                    <img src={all?.share?.image} style={{height:"70px",width:"70px",marginRight:"30px",marginLeft:"10px"}}/>
                    <div>
                        <Typography variant='h5'>{all?.title}</Typography>
                        <Typography variant='h7'>{all?.subtitle}</Typography>
                    </div>
                  </div>
                  </Link>
                      )
                
               })}
                </div>
           
          </div>
    
    </div>
  )
}

export default SingleTrack
