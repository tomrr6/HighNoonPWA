const newCurrentGame = {
    "p1Points": 0,
    "p2Points": 0,
    "p1Misfires": 0,
    "p2Misfires": 0
};


function resetJSON(JSONname, JSONofDefaults) {
    window.localStorage.setItem(JSONname, JSON.stringify(JSONofDefaults));
}

function deleteJSON(JSONname) {
    window.localStorage.removeItem(JSONname);
}

function getJSON(JSONname) {
    return JSON.parse(window.localStorage.getItem(JSONname));
}

function updateJSON(JSONname, key, value) {
    var currentJSON = getJSON(JSONname);
    currentJSON[key] = value;
    window.localStorage.setItem(JSONname, JSON.stringify(currentJSON));
}

// current game functions --------------------------------------------------

function createNewCurrentGame() {
    resetJSON('currentGame', newCurrentGame);
};

function getCurrentGame() {
    return getJSON('currentGame');
};

function updateCurrentGame(key, value) {
    updateJSON('currentGame', key, value);
};

function increaseOrDecreaseScore(player, amount) {
    var currentGame = getCurrentGame();
    if (player == 1) {
        currentGame.p1Points += amount;
    } else if (player == 2) {
        currentGame.p2Points += amount;
    }
    updateCurrentGame('p1Points', currentGame.p1Points);
    updateCurrentGame('p2Points', currentGame.p2Points);
}

// setings functions ------------------------------------------------------------

const defaultSettings = {
    "vsCPU": false,
    "pointsNeededToWin": 5,
    "soundEffects": true,
    "misfiresCheckedFor": true
}

function resetSettings() {
    resetJSON('settings', defaultSettings);
};

function getSettings() {
    return getJSON('settings');
};

function updateSettings(key, value) {
    updateJSON('settings', key, value);
};



//leaderboard functions----------------------------------------
// const newEmptyLeaderboard = {
//     highScoreArray: []
// };
// const highScoreTemplate = {
//     player: null,
//     timeToPress: null,
//     dateTimeRecorded: null
// };

// function resetLeaderboard() {
//     resetJSON('leaderboard', newEmptyLeaderboard);
// };

// function getleaderboard() {
//     return getJSON('leaderboard').highScoreArray;
// };

// function sortLeaderboard() {
//     var leaderboard = getleaderboard();
//     leaderboard.sort(function(a, b) {
//         return a.timeToPress - b.timeToPress;
//     });
//     updateLeaderboard('highScoreArray', leaderboard);
// }

// function updateLeaderboard(key, value) {

// };

// //initialize-----------------------------------
if (getSettings() == null) {
    resetSettings();
}
// if (getleaderboard() == null) {
//     resetLeaderboard();
// }


// createNewCurrentGame();
console.log(getSettings());
console.log(getCurrentGame());
// console.log(getleaderboard());


//credit to https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--fullvh', `${window.innerHeight}px`);
console.log(`${window.innerHeight}px`);