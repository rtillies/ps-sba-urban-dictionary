# SBA 308A: JavaScript Web Application

* **Name**: Richard Tillies
* **Date**: March 8, 2024
* **Requirements**: [SBA JavaScript Web Application](docs/sba-js-web-application.pdf)

## Instructions

* Choose a search term from the drop down menu.
* The chosen word will appear at the top on the right panel.
* The link to the word on the Urban Dictionary website will appear on the top of the accordion.
* The additional panels will display the entry date and approval rating percentage.
  * Expand each panel to get the definition and example.
  * The results will only display results that meet or exceed the minimum approval rating.
  * The approval rating slider can be adjusted between 50% and 80%
* The definitions and examples are filtered for profanity via a second API.
  * The filter is not "perfect". Some offensive words remain because they are technically not profane (e.g. the original title of *Let's Get It Started* by the Black Eyed Peas).
  * The filter also censors "bad words" within other words. Sometimes this is wanted (e.g. "mother\*\*\*\*er"); other times not (e.g. "assume" becomes "\*\*\*ume"). 

## Objectives

* Use asynchronous JavaScript tools to build a responsive web application.
* Demonstrate understanding of the JavaScript event loop.
* Generate asynchronous code using Promises and async/await syntax.
* Use fetch and/or Axios to interact with an external web API.
* Organize files using modules and imports.

## Notes

* Most of the free APIs on the [RapidAPI](https://rapidapi.com/hub) website did not have the ability to make POST, PUT, or PATCH requests.
* A few *freemium* APIs had POST capabilities, but the daily or monthly limits were very low and required a credit card to subscribe.