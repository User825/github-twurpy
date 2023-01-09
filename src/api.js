import axios from "axios";

export const fetchUsers = () => {
  const url = 'https://dummyjson.com/users?limit=100&select=firstName,lastName,email,image';
  
  return axios.get(url).then(resp => resp.data.users);
}

export const fetchGames = () => {
  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
    }
  }
  return axios.request(options).then(resp => resp.data);
}
