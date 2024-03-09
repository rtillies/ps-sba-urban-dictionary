const searchTerms = ['fly', 'phat', 'dope', 'fresh', 'def', 'bling', 'props', 'word', 'ill', 'homie', 'crib']

const dropdown = document.querySelector('#dropdown')
const resetAllButton = document.querySelector('#reset-all')
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

const populateDropdown = () => {
  searchTerms.forEach((term) => {
    const optionHtml = document.createElement('option')
    optionHtml.value = term
    optionHtml.innerText = term
    dropdown.append(optionHtml)
  })
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

    clearAccordion()

    changeTopItem(data[0])

    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      createAccordionItem(item, i)
    }
  } catch (error) {
    console.error(error);
  }
}

function clearAccordion() {
  while (accordion.childElementCount > 1) {
    accordion.lastElementChild.remove()
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
  wordHeading.innerText = item.word;
}

async function createAccordionItem(item, index) {
  let percent = Math.round(item.thumbs_up * 100 / (item.thumbs_up + item.thumbs_down))
  const date = item.written_on.split('T')[0]
  let minValue = Number(minApproval.innerText)
  if (percent < minValue) return

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

  const cleanDefinition = await removeProfanity(item.definition)
  const cleanExample = await removeProfanity(item.example)
  accordionButton.innerHTML = `
    <i class="fa-solid fa-thumbs-up"></i> &nbsp; 
    ${percent}% &nbsp; &nbsp; &nbsp; 
    <i class="fa-solid fa-calendar-days"></i> &nbsp; &nbsp; 
    <b>${date}</b> 
    `
  accordionBody.innerHTML = `
    <p><b>Definition</b><br />
      ${cleanDefinition}
      </p>
      <p><b>Example</b><br />
      ${cleanExample}
    </p>
    `
  accordionHeader.append(accordionButton)
  accordionCollapse.append(accordionBody)
  accordionItem.append(accordionHeader)
  accordionItem.append(accordionCollapse)
  accordion.append(accordionItem)
}

async function removeProfanity(text) {
  const options = {
    method: 'GET',
    url: 'https://community-purgomalum.p.rapidapi.com/json',
    params: {
      text: text
    },
    headers: {
      'X-RapidAPI-Key': '750a17b4fcmsh7cef245e5bdf231p15b39ejsn3613a3a94360',
      'X-RapidAPI-Host': 'community-purgomalum.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log("Clean result", response.data.result);
    return response.data.result
  } catch (error) {
    console.error(error);
  }
}

function resetAll() {
  dropdown.value = ''
  slider.value = 60;
  minApproval.innerHTML = slider.value;
  wordHeading.innerHTML = '&nbsp;'
  clearAccordion();
  resetPlaceholder();
}

function resetPlaceholder() {
  const topButton = topItem.getElementsByTagName('button')[0]
  topButton.innerHTML = 'Choose a search term from the dropdown menu!'

  const topBody = topItem.getElementsByTagName('div')[0]
  const div = document.createElement('div')
  div.classList.add('accordion-body')

  const p = document.createElement('p')
    
  p.innerText = "Get definitions and examples for your search term here!"
  div.append(p)
  topBody.append(div)
}

// Main program
populateDropdown()
clearAccordion()

dropdown.addEventListener ('change', searchTerm)
resetAllButton.addEventListener ('click', resetAll)
