import axios from 'axios';

async function getCards(color) {
   return axios.get('http://localhost:4000/'+color+'/');
}
