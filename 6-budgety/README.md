# Budgety App
An app to track the total budget in a Month adding incomes and expenses

## Motivation
Build a JS app to apply the concepts saw in [Section 5](../5-advanced-js/script.js)

## Base Features (made with the videos / author)
- Add income
- Add expense
- Format numbers
- Display total budget
- Show percentage of an expense from total income

## Extended Features (developed by me)
- Validating if input value is a negative number, if so, setting it to 0.

- Saving data in localStorage to make it persistent. If the user is in the same month, no matter if he/she reloads the page, the app will keep the budget state. In order to do this, I'm saving now the month and year as part of the app data.

- Translated to ES6 version in [app-es6.js](./app-es6.js) script.