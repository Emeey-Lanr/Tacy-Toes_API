"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketLogicF = exports.gameBox = void 0;
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
}
exports.SocketLogicF = SocketLogicF;
