import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
// const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjZkMDdmYzM3YmEzYTU0ZjM4ZjEzMWFhZDNlYmM1OSIsInN1YiI6IjY0YjEwOTI5YmE0ODAyMDBhZDgzODU4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iXnS7dQy_UZDKB7I5MbFm1QhKwdvf0-G5eRe3crlXdY'

const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjZkMDdmYzM3YmEzYTU0ZjM4ZjEzMWFhZDNlYmM1OSIsInN1YiI6IjY0YjEwOTI5YmE0ODAyMDBhZDgzODU4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iXnS7dQy_UZDKB7I5MbFm1QhKwdvf0-G5eRe3crlXdY'
};

export const fetchDataFromApi = async (url, params)=>{
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;

    }catch(err){
        console.log(err);
        return err;
    }


}