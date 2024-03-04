// import axios from 'axios';

const searchButton = document.querySelector('#search-button')
const searchText = document.querySelector('#search-field')
const dropdown = document.querySelector('#dropdown')
const accordion = document.querySelector('#accordionExample')

searchButton.addEventListener ('click', searchTerm)

async function searchTerm(event) {
  const options = {
    method: "GET",
    url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
    params: { term: "fly" },
    headers: {
      "X-RapidAPI-Key": "750a17b4fcmsh7cef245e5bdf231p15b39ejsn3613a3a94360",
      "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
