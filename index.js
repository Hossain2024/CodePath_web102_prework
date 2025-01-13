/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 * 
 * 
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

        

        for (let i = 0; i < games.length; i++) {
            const game = games[i]; 

             // Create a new div element, which will become the game card
            const gameCard = document.createElement("div");

            // Add the 'game-card' class to the new div
            gameCard.classList.add("game-card");
            
            // Set the inner HTML using a template literal to display some info about each game
            gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class= "game-img">
            <h3>${game.name}</h3>
            <p>${game.description}</p> `;

            //Append the game card to the games-container
            gamesContainer.appendChild(gameCard);

        }
               
    }

    addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContribution = GAMES_JSON.reduce((total, game)=> { 
    return total+game.backers;},0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `
<p>${totalContribution.toLocaleString()}</p>
`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalPledged = GAMES_JSON.reduce((total, game)=>{
    return total + game.pledged;}, 0);

    raisedCard.innerHTML = `<p>${totalPledged.toLocaleString()}<p>`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalgames = GAMES_JSON.length;

gamesCard.innerHTML =`<p>${totalgames.toLocaleString()}<p>`



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    
    const goal_notmet = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal}); 
        
    
    // use the function we previously created to add the unfunded games to the DOM
      addGamesToPage(goal_notmet);

}



// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const goal_met = GAMES_JSON.filter((game)=>{
        return game.pledged >= game.goal}); 
        
    
    // use the function we previously created to add the unfunded games to the DOM
      addGamesToPage(goal_met);

    // use the function we previously created to add unfunded games to the DOM

}



// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);


// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const total_unfundeded_games = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalPledged.toLocaleString()} has been raised for ${GAMES_JSON.length} game${GAMES_JSON.length === 1 ? '' : 's'} so far. ${total_unfundeded_games} game${total_unfundeded_games === 1 ? '' : 's'} remain unfunded. We need your help to fund these amazing game${total_unfundeded_games === 1 ? '' : 's'}!`;

// create a new DOM element containing the template string and append it to the description container
const descriptioncard = document.createElement("p");


descriptioncard.innerHTML = `<p>${displayStr.toLocaleString()} </p>`


descriptionContainer.appendChild(descriptioncard);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...othersGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

const topGame = first.name;
const topGameCard = document.createElement("div");
topGameCard.innerHTML = `<p>${topGame}</p>`
firstGameContainer.appendChild(topGameCard);

const secondGame = second.name;
const secondGameCard  = document.createElement("div");

secondGameCard.innerHTML =`<p>${secondGame}</p>`
secondGameContainer.appendChild(secondGameCard);




// do the same for the runner up item