# Houseware Assignment

## Pre-requisite

- Node
- Yarn

## Setup 

- Clone the repo with command
```
add link here
```
- Checkout to the folder 
```
cd folder-name
```
- Run below command to install dependencies
```
yarn install
```
- Start the React app with command,
```
yarn dev
```
- Go to you browser on `http://localhost:5173` to see your app running.


## Plan for writing tests

First of all I would like to separate utils functions like `sanitize`, `hasValidMin` to add in separate folder and then import and use them, with this we can also unit test the utils function and code will also be cleaner.

Now let's start with the plan of what kind of tests we can write for the app,

### Unit Tests

- Footer Component
  - First we can pass the todo array with length 0 and then assert then footer shouldn't show in UI.
  - Then we can pass only one todo with `completed: false` to check if todo count span element is rendering properly or not
  - Then we can pass todos with `completed: true` to check if todo count span renders **0 items left!**
  - Then we can pass more than one todo with `completed: false` to check if todo count span element is rendering properly or not
  - Then we can check on initial render **All** is selected as default if there is any todo rendered.
  - Then we can check if on click of any other filter it has className selected and removed from previous filter too.
  - Then we can pass todos with `completed: false` to check if  **Clear completed** button is disabled and similarly for vice-versa case.
  - Then we can **Clear completed** function is triggers or not, if button is clicked for both disabled and not disabled case.

- Header Component
  - First we can test if the Header container is in the UI(document).
  - Then we can check if it has heading  **todos** in UI, and check if it renders the child component as expected.

- Input Component
  - Firstly we can pass the props to see if the input component renders in the UI with the correct props and default attributes like `autoFocus`, `placeholder`, `label`(with class **visually-hidden**)
  - Then we can test the if `onBlur` function triggers when event occurs.
  - Then we can test the if `onSubmit` function triggers when only **Enter** key is being pressed and `hasValidMin` function condition satisfies and vice versa for `onSubmit` function not triggers case.
  - Then we can test is the input has value after submitting or not and vice versa.

- Item Component
  - Firstly I would like to break this component into presentation and container component for easy testing the functions and other state logic.
  - Then we can pass props to see everything is rendering properly like `title`, `completed`
  - Then we can assert the function `toggleItem`, `removeItem`, `updateItem`, `handleDoubleClick`, `handleBlur`, `handleUpdate` based on the conditions for which they trigger and vice versa case where it shouldn't trigger.
  - We can check conditional rendering of only readable input and readable input by passing true and false for `isWritable` state variable
  - We can pass todo with `completed` to true and false one by one to check if it renders according to the requirement(checking the input and vice versa)

- Main Component
  - Firstly I would like to break this component into presentation and container component for easy testing the functions and other state logic.
  - Then I will pass down the necessary props to check if the component renders according to the props/
  - Then I will pass `visibleTodos` with length **0** and vice versa to check conditional rendering happens properly.
  - Then I will pass `visibleTodos` with some todos as completed equals true and some as false, and check if the checked marked is applied according to the data I passed into props.
  - Then I will check the `onChange` function triggers when input is checked or not and vice versa.

- Utils(sanitize, hasValidMin)
  - We can also test the `sanitize` and `hasValidMin` utils function by simply passing the data in arguments and check against what value we want from this functions.

  - Sanitize function
    - Like in `sanitize` function we can pass string with **&**, **<** etc. characters present in `map` and then check that return value should have these characters replaced with the map values like **&amp;** for &, **&lt;** for **<** etc.
    - Similarly in `sanitize` function we can pass normal string which doesn't contains **&**, **<** etc. and check that return value should be same as passes(since it doesn't contain any value present in `map`)

  - Sanitize function
    - Similarly for `hasValidMin` function we can pass combinatios of values and min in boolean combination like,
      - big small(in length and number of min parameter)
      - small big (in length and number of min parameter)
      - small small (in length and number of min parameter)
      - big big (in length and number of min parameter) 
    to see if returns the expected value as we want.

- Integration Tests
  - We can test the tests components togethers in this tests to see if they behave as it should be by passing necessary props data(like in out main there is item which is also rendered, so we can test both of them and see how they work together, similarly for other components).

- Snapshot Tests
In this kind of tests I will store the snapshots of previous test cases where tests being passed and committed. Then we can match tests with that snapshots and if that snapshot fails something might gone wrong.

- E2E Test
  - We can test the overall flow just like a real user uses the app to test end to end flow of the app, by adding todos, performing operations and the asserting against that operations if the operations got successfully and vice versa.
