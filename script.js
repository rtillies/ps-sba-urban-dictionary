// import axios from 'axios';

const searchTerms = ['fly', 'phat', 'dope', 'fresh', 'def', 'bling', 'props', 'word', 'ill', 'homie', 'crib']

const searchButton = document.querySelector('#search-button')
const searchText = document.querySelector('#search-field')
const dropdown = document.querySelector('#dropdown')
const accordion = document.querySelector('#accordionExample')

const populateDropdown = () => {
  searchTerms.forEach((term) => {
    const optionHtml = document.createElement('option')
    optionHtml.value = term
    optionHtml.innerText = term
    dropdown.append(optionHtml)
  })
}
populateDropdown()

searchButton.addEventListener ('click', searchTerm)
dropdown.addEventListener ('change', searchTerm)

async function searchTerm(event) {
  console.log("Event", event);
  console.log("Target", event.target);
  console.log("Value", event.target.value);
  const term = event.target.value;

  const options = {
    method: "GET",
    url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
    params: { term: term },
    headers: {
      "X-RapidAPI-Key": "750a17b4fcmsh7cef245e5bdf231p15b39ejsn3613a3a94360",
      "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.list 
    console.log(data);
    // response.data.forEach((item) => {
    //   console.log(index, item);
    // })
    // for (const item of data) {
    for (let i = 0; i == 0; i++) {
      const item = data[0]
      console.log(item.word);
      console.log(item.written_on);
      console.log(item.definition);
      console.log(item.permalink);
      console.log(item.example);
      let percent = Math.round(item.thumbs_up * 100 / (item.thumbs_up + item.thumbs_down))
      console.log(`${percent}%`);
    
    }
  } catch (error) {
    console.error(error);
  }
}
