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
import "./Home.css"



const TopSection = ({image,audio}) => {
    let [loading,setLoading]=React.useState(true)
    let [topCharts,setTopCharts]=React.useState([])

    React.useEffect(()=>{
        const start=async ()=>{
           setLoading(true)
             let charts=await fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
             let data=await charts.json()
             setTopCharts(data)
             setLoading(false)
          }
          start()
  
      },[])
  
  
  return (
    <div>
          {loading?<CircularProgress/>: <div className='home__Tops__Info' style={{marginLeft:"20px"}}>

           <div className='wrapper'>
                <div className='top__Charts'>
                <Typography variant='h6'>Top Charts</Typography>


               {topCharts.slice(0,5).map((all,i)=>{
                   return(
                       
                       <Link style={{color:"black"}} to={`/Track/${all?.key}`}>
                           <div style={{display:"flex",marginBottom:"30px",cursor:"pointer"}}>
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

             <div>
               {audio && <audio  src={audio} controls autoPlay/>}
               {image && <img src={image} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>}
           </div>
           

 </div>
             


             <div className='top__Artists'>
                <Typography variant="h5">Top Artists</Typography>
                <div style={{display:"flex"}}>
                    {
                        topCharts.slice(0,5).map((all)=>{
                            return  <Avatar style={{marginRight:"15px"}} alt="Remy Sharp" src={all?.images?.background} />
                        })
                    }
                </div>
             </div>


         </div>
}

    </div>
  )
}

export default TopSection
