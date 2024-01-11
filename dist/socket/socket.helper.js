"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameWinnerCheckerF = exports.checkWhoPlayedLastAlgF = void 0;
const checkWhoPlayedLastAlgF = (array, input) => {
    let playingError = false;
    if (array.length < 1) {
        array.push(input);
    }
    else {
        if (array[array.length - 1] !== input) {
            array.push(input);
        }
        else {
            playingError = true;
        }
    }
    return { playingError, array };
};
exports.checkWhoPlayedLastAlgF = checkWhoPlayedLastAlgF;
const gameWinnerCheckerF = (array) => {
    let winner = null;
    // To know if they can go ahead to check i f there is a winner
    let canCheckWinner = true;
    let winnerSign = "";
    let position = "";
    //  check if the the total of x and o is equal to 4, that's the only time a possible winner
    // can occur
    let XO_Total = array.filter((value) => value === "O" || value === "X").length;
    const changeVariablesF = (winnerSignValue, positionValue, winnerValue) => {
        winnerSign = winnerSignValue;
        position = positionValue;
        winner = winnerValue;
    };
    if (XO_Total > 3) {
        // All the possible ways that guarantee someone's win
        if ((array[0] === array[1]) && array[0] === array[2]) {
            changeVariablesF(array[0], "top", true);
        }
        else if ((array[3] === array[4]) && array[3] === array[5]) {
            changeVariablesF(array[3], "horinzontal_middle", true);
        }
        else if ((array[6] === array[7]) && array[6] === array[8]) {
            changeVariablesF(array[6], "bottom", true);
        } ////////////////<>/////////////////////////
        else if (array[0] === array[3] && array[0] === array[6]) {
            changeVariablesF(array[0], "left", true);
        }
        else if ((array[1] === array[4]) && array[1] === array[7]) {
            changeVariablesF(array[1], "vertical_middle", true);
        }
        else if ((array[2] === array[5]) && array[2] === array[8]) {
            changeVariablesF(array[2], "right", true);
        }
        ///////////////////////////////////////////////
        else if ((array[0] === array[4]) && array[0] === array[8]) {
            changeVariablesF(array[0], "cross_left", true);
        }
        else if ((array[2] === array[4]) && array[2] === array[6]) {
            changeVariablesF(array[2], "cross_right", true);
        }
        else if (XO_Total === 9) {
            winner = false;
        }
    }
    else {
        canCheckWinner = false;
    }
    return { winner, canCheckWinner, position, winnerSign };
};
exports.gameWinnerCheckerF = gameWinnerCheckerF;
