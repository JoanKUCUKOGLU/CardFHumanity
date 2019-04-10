import axios from 'axios';

export async function getCards(color) {
   const {data} = await axios.get('http://localhost:4000/'+color+'/');

   return data
}


export async function getCard(color) {
  const cards = await getCards(color)

  const cardnb = Math.floor(Math.random() * 482)

  const card = cards[cardnb]

  return card

}
