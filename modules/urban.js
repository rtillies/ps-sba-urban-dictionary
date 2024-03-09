import { createAccordionItem, removeProfanity } from './filter.js';

const accordion = document.querySelector('#accordionExample')
const topItem = document.getElementById('top-item')
const wordHeading = document.querySelector('#word-heading')
const slider = document.getElementById("slider");
let minApproval = document.getElementById("min-approval");
minApproval.innerHTML = slider.value;

slider.oninput = function() {
  minApproval.innerHTML = this.value;
  if (dropdown.value !== '')
    searchTerm({"target": dropdown})
}


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
    const first = data[0]

    clearAccordion()

    setWordHeading(first)
    changeTopItem(first)

    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      createAccordionItem(item, i)
    }
  } catch (error) {
    console.error(error);
  }
}

function changeTopItem(item) {
  console.log("Top Item", topItem);
  const topButton = topItem.getElementsByTagName('button')[0]
  console.log("Top Button", topButton);
  topButton.innerHTML = 
    `<span>
    Urban Dictionary Permalink:
    <a href="${item.permalink}" 
      target="_blank" 
      alt="Permalink to definition">
      <b>${item.word}</b>
    </a>
    </span>
    `

  const topBody = topItem.getElementsByTagName('div')[0]
  console.log("Top Body", topBody);
  topBody.innerHTML = ''
}

function clearAccordion() {
  while (accordion.childElementCount > 1) {
    accordion.lastElementChild.remove()
  }
}

function setWordHeading(item) {
  wordHeading.innerText = item.word;
}
  
export { searchTerm, changeTopItem, clearAccordion };