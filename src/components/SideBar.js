import React from 'react'

import "./SideBar.css"

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DataArray from "./DataArray"

import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import PeopleIcon from '@mui/icons-material/People';
import AddchartIcon from '@mui/icons-material/Addchart';
import {Link, NavLink} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';




const SideBar = () => {

    

  let [sidebarOpen,setSidebarOpen]=React.useState(false)

  

  function open(){
    setSidebarOpen(true)
  }

  function close(){
    setSidebarOpen(false)
  }

  function buttonhandle(name){
    
    setSidebarOpen(false)
  }

  function buttonhandlehome(name){
    setSidebarOpen(false)
  }

  // console.log(selectedButton)

  return (
    <div>

{/* bigsidebar */}
      <div className='sidebar__Main'>
        <div className='sidebar__Main__Section'>

          
          <NavLink style={{color:'gray'}} to="/">
              <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Around You")} >
                <h1 className='h__Cormorant'> < MenuIcon/></h1>
                <Typography variant='h6' className='p__Cormorant'>Discover</Typography>
              </div>
          </NavLink>

          <NavLink style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'gray'})} to="/aroundYou">
              <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Around You")} >
                <h1 className='h__Cormorant'> < RefreshIcon/></h1>
                <Typography variant="h6" className='p__Cormorant'>Around You</Typography>
              </div>
          </NavLink>


           <NavLink style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'gray'})} to="/topArtists">
              <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Top Artists")} >
                <h1 className='h__Cormorant'> < PeopleIcon /></h1>
                <Typography variant="h6" className='p__Cormorant'>Top Artists</Typography>
              </div>
           </NavLink>

              <NavLink style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'gray'})} to="/topCharts">
                <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Top Charts")} >
                  <h1 className='h__Cormorant'>< AddchartIcon /></h1>
                  <Typography variant="h6" className='p__Cormorant'>Top Charts</Typography>
                </div>
              </NavLink>

              <NavLink style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'gray'})} to="/search">
                <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Top Charts")} >
                  <h1 className='h__Cormorant'>< SearchIcon /></h1>
                  <Typography variant="h6" className='p__Cormorant'>Search</Typography>
                </div>
              </NavLink>
          
        </div>

      </div>

{/* small sidebar */}

      <div className='small__Sidebar'>
        <h1 onClick={open} className="ham" ><MenuIcon fontSize='large'/></h1>
        {
          sidebarOpen &&
          <>

            <div className='small__Sidebar__Transparent__Layout'> </div>
            <div className='small__Sidebar__Middle__Section'>
          <h1 className='close' onClick={close}><CloseIcon /></h1>

       
          
          <div className='sidebar__Main__Section'>

          
          <NavLink style={{color:'gray'}} to="/">
              <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Around You")} >
                <h1 className='h__Cormorant'> < MenuIcon/></h1>
                <Typography variant='h6' className='p__Cormorant'>Discover</Typography>
              </div>
          </NavLink>

          <NavLink style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'gray'})} to="/aroundYou">
              <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Around You")} >
                <h1 className='h__Cormorant'> < RefreshIcon/></h1>
                <Typography variant="h6" className='p__Cormorant'>Around You</Typography>
              </div>
          </NavLink>


           <NavLink style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'gray'})} to="/topArtists">
              <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Top Artists")} >
                <h1 className='h__Cormorant'> < PeopleIcon /></h1>
                <Typography variant="h6" className='p__Cormorant'>Top Artists</Typography>
              </div>
           </NavLink>

              <NavLink style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'gray'})} to="/topCharts">
                <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Top Charts")} >
                  <h1 className='h__Cormorant'>< AddchartIcon /></h1>
                  <Typography variant="h6" className='p__Cormorant'>Top Charts</Typography>
                </div>
              </NavLink>

              <NavLink style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'gray'})} to="/search">
                <div className={`sidebar__Sections`} onClick={()=>buttonhandle("Top Charts")} >
                  <h1 className='h__Cormorant'>< SearchIcon /></h1>
                  <Typography variant="h6" className='p__Cormorant'>Search </Typography>
                </div>
              </NavLink>
          
        </div>

        </div>
          </>
        }
      </div>


    </div>
  )
}

export default SideBar