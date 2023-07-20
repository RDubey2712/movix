import React, { useEffect, useState } from 'react'
import './heroBanner.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import {useSelector} from 'react-redux';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/Lazyloadimg/Img'

const HeroBanner = () => {
  const [backGround, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate()
  const {url} = useSelector((state)=>state.home)

  const {data, loading} = useFetch('/movie/upcoming')

  useEffect(()=>{
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*10)]?.backdrop_path
    setBackground(bg)

  }, [data])

  //for input search handle

  const searchQueryHandler = (e)=>{
    if(e.key === 'Enter' && query.length>0){
        navigate(`/search/${query}`);
    }

    

  }


  return (
    <div className='heroBanner'>
      {!loading && <div className="backdrop-img">
        <Img src={backGround}/>
      </div>}
      <div className="opecity_layer"></div>
      <ContentWrapper>      
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">Millons of movies, Tv shows and people to discover. Explore now.</span>
          <div className="searchINput">
            <input 
            type="text" 
            placeholder='search for movie or tv show....'
            onKeyUp={searchQueryHandler}
            onChange={(e)=>setQuery(e.target.value)}
             />
            <button>Search</button>
          </div>
        </div>
      
      </ContentWrapper>

    </div>
  )
}

export default HeroBanner