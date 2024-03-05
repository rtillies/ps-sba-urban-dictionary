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
resetAccordion()
// createAccordionItem("i", 3)

// searchButton.addEventListener ('click', searchTerm)
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

    resetAccordion()

    changeTopItem(data[0])

    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      createAccordionItem(item, i)
    }
  } catch (error) {
    console.error(error);
  }
}

function resetAccordion() {
  console.log(accordion.childElementCount);
  while (accordion.childElementCount > 1) {
    accordion.lastElementChild.remove()
  }
}

function changeTopItem(item) {
  const topItem = document.getElementById('top-item')
  console.log("Top Item", topItem);
  const topButton = topItem.getElementsByTagName('button')[0]
  console.log("Top Button", topButton);
  topButton.innerHTML = `<b>${item.word}</b>`
  const topBody = topItem.getElementsByTagName('div')[0]
  console.log("Top Body", topBody);
  topBody.innerHTML = 
  `<p>
    Permalink: 
    <a href="${item.permalink}" 
      target="_blank" 
      alt="Permalink to definition">
      ${item.word}
    </a></p>
  `
}

function createAccordionItem(item, index) {
  const testItem = {
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
  
  const accordionCollapse = document.createElement('div')
  accordionCollapse.id = `collapse${index}`
  accordionCollapse.classList.add('accordion-collapse')
  accordionCollapse.classList.add('collapse')
  accordionCollapse.setAttribute('data-bs-parent','#accordionExample')

  
  const accordionBody = document.createElement('div')
  accordionBody.classList.add('accordion-body')

  const date = item.written_on.split('T')[0]
  accordionButton.innerHTML = `<b>[${index+1}] ${date}</b>`
  accordionBody.innerHTML = `
    <p><b>Definition</b><br />
      ${item.definition}
    </p>
    <p><b>Example</b><br />
      ${item.example}
    </p>
    <p>
      <i class="fa-solid fa-thumbs-up"></i> ${percent}%
    </p>
    `

  accordionHeader.append(accordionButton)
  accordionCollapse.append(accordionBody)
  accordionItem.append(accordionHeader)
  accordionItem.append(accordionCollapse)
  accordion.append(accordionItem)
}