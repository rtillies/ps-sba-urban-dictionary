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
createAccordionItem("i", 3)

// searchButton.addEventListener ('click', searchTerm)
// dropdown.addEventListener ('change', searchTerm)

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
      const item = data[i]
      createAccordionItem(item)
    
    }
  } catch (error) {
    console.error(error);
  }
}

function createAccordionItem(i, index) {
  const item = {
    "definition": "[sexy] or [hella fine]",
    "permalink": "http://fly.urbanup.com/11451940",
    "thumbs_up": 48,
    "author": "reger3785",
    "word": "fly",
    "defid": 11451940,
    "current_vote": "",
    "written_on": "2017-04-19T00:09:36.591Z",
    "example": "[damn girl] you fly",
    "thumbs_down": 3  
  }

  console.log(item.word);
  console.log(item.written_on);
  console.log(item.definition);
  console.log(item.permalink);
  console.log(item.example);
  let percent = Math.round(item.thumbs_up * 100 / (item.thumbs_up + item.thumbs_down))
  console.log(`${percent}%`);

  const accordionItem = document.createElement('div')
  accordionItem.classList.add('accordion-item')
  
  const accordionHeader = document.createElement('h2')
  accordionHeader.classList.add('accordion-header')
  
  const accordionButton = document.createElement('button')
  accordionButton.classList.add('accordion-button')
  accordionButton.classList.add('collapsed')
  accordionButton.type = 'button'
  accordionButton.setAttribute('data-bs-toggle','collapse')
  accordionButton.setAttribute('data-bs-target',`#collapse${index}`)
  accordionButton.setAttribute('aria-expanded','false')
  accordionButton.setAttribute('aria-controls',`#collapse${index}`)
  // <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
  //           Accordion Item #2
  //         </button>
  
  const accordionCollapse = document.createElement('div')
  accordionCollapse.id = `collapse${index}`
  accordionCollapse.classList.add('accordion-collapse')
  accordionCollapse.classList.add('collapse')
  accordionCollapse.setAttribute('data-bs-parent','#accordionExample')

  
  const accordionBody = document.createElement('div')
  accordionBody.classList.add('accordion-body')

  const date = item.written_on.split('T')[0]
  accordionButton.innerHTML = `<b>${date}</b>`
  accordionBody.innerHTML = `<p>${item.definition}</p>`

  accordionHeader.append(accordionButton)
  accordionCollapse.append(accordionBody)
  accordionItem.append(accordionHeader)
  accordionItem.append(accordionCollapse)
  accordion.append(accordionItem)
}