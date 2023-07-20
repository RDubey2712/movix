import { useEffect } from 'react';
import './App.css';
import {fetchDataFromApi} from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import {getApiConfiguration, getGenres} from './store/homeSlice';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
// import PageNotFound from './pages/404/pageNotFound'
import PageNotFound from './pages/404/PageNotFound';





function App() {
  const dispatch = useDispatch();  
  const { url } = useSelector((state) => state.home);
  

  useEffect(()=>{
    fetchApiConfig()
    genresCall();
  },[]);

  const fetchApiConfig = () =>{
    fetchDataFromApi('/configuration')
      .then((res)=>{
        console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + 'original',
          poster: res.images.secure_base_url + 'original',
          profile: res.images.secure_base_url + 'original'
        }
        dispatch(getApiConfiguration(url))
      })

  }

  const genresCall = async()=>{
    let promises = []
    let endPoints = ['tv', 'movie']
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    // console.log("🚀 ~ file: App.jsx:53 ~ genresCall ~ data:", data)
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
    })
    dispatch(getGenres(allGenres))
    // console.log("🚀 ~ file: App.jsx:59 ~ genresCall ~ allGenres:", allGenres)
  }
  




  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path='/:mediaType/:id' element={<Details/>}/>
        <Route path='/search/:query' element={<SearchResult/>}/>
        <Route path='/explore/:mediaType' element={<Explore/>}/>
        <Route  path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      

     
      
    </div>
  );
}

export default App;
