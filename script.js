import { createAccordionItem, removeProfanity } from './modules/filter.js';
import { searchTerm, changeTopItem, clearAccordion } from './modules/urban.js';

const searchTerms = ['fly', 'phat', 'dope', 'fresh', 'def', 'bling', 'props', 'word', 'ill', 'homie', 'crib']

const dropdown = document.querySelector('#dropdown')
const resetAllButton = document.querySelector('#reset-all')
const wordHeading = document.querySelector('#word-heading')
const topItem = document.getElementById('top-item')

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
