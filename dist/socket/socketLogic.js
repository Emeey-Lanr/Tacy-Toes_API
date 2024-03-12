"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketLogicF = exports.gameBox = void 0;
const play_game_1 = require("../api/services/play.game");
const socket_helper_1 = require("./socket.helper");
exports.gameBox = [];
class SocketLogicF {
    static addUser(data) {
        const gameCreatorId = data.gameDetails.game_id + data.gameDetails.player_username;
        let someOneJoinedBefore = -1;
        //0 means we are just creating a registration
        //1 means someonw has joined before 
        let gameBoxDetails = {
            creator: data.gameDetails.creator_username,
            versus: data.gameDetails.player_username,
            creatorScore: 0,
            creatorSymbol: "X",
            versusSymbol: "O",
            round: 1,
            versusScore: 0,
            gameId: data.gameDetails.game_id,
            creatorVersusId: `${gameCreatorId}`,
            game: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
            whoPlayedLast: [],
            joined: [data.isOwner ? `${data.gameDetails.creator_username}` : `${data.gameDetails.player_username}`]
        };
        const bothJoined = false;
        if (exports.gameBox.some((value) => value.creatorVersusId === gameCreatorId)) {
            const currentData = exports.gameBox.find((value) => value.creatorVersusId === gameCreatorId);
            // The current user trying to join can be the creator  or his versus,
            // with the data.isOnwer we can know who is tring to join
            // if data.isOwner is true, is the creator, if it's false, it's its versus
            const currentUser = data.isOwner ? data.gameDetails.creator_username : data.gameDetails.player_username;
            if (!(currentData === null || currentData === void 0 ? void 0 : currentData.joined.some((value) => value === currentUser))) {
                currentData === null || currentData === void 0 ? void 0 : currentData.joined.push(currentUser);
            }
            someOneJoinedBefore = 1;
            // Here means a user has registered before
            // if data.isOwner = true, that means the use registering now is the owner
        }
        else {
            someOneJoinedBefore = 0;
            exports.gameBox.push(gameBoxDetails);
        }
        return { statusNumber: someOneJoinedBefore, whoHasJoined: exports.gameBox.filter((value) => value.creatorVersusId === gameCreatorId)[0].joined };
    }
    static FindGameToStart(creator, versus, gameId) {
        let error = false;
        let gameData = exports.gameBox.find((value) => value.creator === creator && value.versus === versus && value.gameId === gameId);
        if (!gameData) {
            error = true;
            return { error };
        }
        return { gameData, error };
    }
    static playGame(isOwner, creator, versus, gameId, arrayPositionId, signatureSign) {
        // find the game
        let userCurrentGame = exports.gameBox.find((value) => value.creator === creator && value.versus === versus && value.gameId === gameId);
        //  creator = 0
        // versus = 1
        if (userCurrentGame) {
            userCurrentGame.game[arrayPositionId] = signatureSign;
            userCurrentGame.whoPlayedLast.push(signatureSign);
            let checkIfWinner = (0, socket_helper_1.gameWinnerCheckerF)(userCurrentGame.game);
            if (!checkIfWinner.canCheckWinner) {
                return { userCurrentGame, checkIfWinner };
            }
            // Winner of no winner at the end of  the game
            let neSetGame = ["A", "B", "C", "D", "E", "F", "G", "H", "I",];
            // if there is a winner
            if (checkIfWinner.winner !== null && checkIfWinner.winner) {
                userCurrentGame.creatorScore = isOwner === 0 ? userCurrentGame.creatorScore + 1 : userCurrentGame.creatorScore;
                userCurrentGame.versusScore = isOwner === 1 ? userCurrentGame.versusScore + 1 : userCurrentGame.versusScore;
                userCurrentGame.round = userCurrentGame.round + 1;
                // we changed who last played to an empty array
                userCurrentGame.whoPlayedLast = [];
                // an replace game with new sets
                userCurrentGame.game = neSetGame;
            }
            else if (checkIfWinner.winner !== null && checkIfWinner.winner === false) {
                // if all the boxes have been filled, meaning nobody has won
                userCurrentGame.round = userCurrentGame.round + 1;
                // we changed who last played to an empty array
                userCurrentGame.whoPlayedLast = [];
                // an replace game with new sets
                userCurrentGame.game = neSetGame;
            }
            // 5 -1 = 4 rounds played
            if (userCurrentGame.round === 5) {
                play_game_1.PlayGameS.saveGame(userCurrentGame.creatorScore, userCurrentGame.versusScore, userCurrentGame.gameId).then((result) => {
                    return { userCurrentGame, checkIfWinner };
                });
            }
            return { userCurrentGame, checkIfWinner };
        }
    }
}
exports.SocketLogicF = SocketLogicF;
