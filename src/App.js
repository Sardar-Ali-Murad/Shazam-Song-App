
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {Home,SingleArtist,SingleTrack,AroundYou,TopCharts,TopArtists,SearchResults,Search} from "./components/index"


function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <SideBar/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Track/:trackId" element={<SingleTrack/>}/>
          <Route path="/Artist/:Id" element={<SingleArtist/>}/>
          <Route path="/aroundYou" element={<AroundYou/>}/>
          <Route path="/topCharts" element={<TopCharts/>}/>
          <Route path="/topArtists" element={<TopArtists/>}/>
          {/* <Route path="/search" element={<SearchResults/>}/> */}
          <Route path="/search" element={<Search/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
