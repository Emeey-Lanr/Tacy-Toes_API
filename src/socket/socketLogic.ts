import { PlayGameS } from "../api/services/play.game";
import { gameWinnerCheckerF } from "./socket.helper";
import { GameDetails_I } from "./socket.interface"
export const gameBox: GameDetails_I[] = []


export class SocketLogicF {
    static addUser(data: any) {   
        const gameCreatorId = data.gameDetails.game_id + data.gameDetails.player_username;
        let someOneJoinedBefore = -1
        //0 means we are just creating a registration
        //1 means someonw has joined before 
        let gameBoxDetails:GameDetails_I = {
            creator: data.gameDetails.creator_username,
            versus: data.gameDetails.player_username,
            creatorScore:0,
            creatorSymbol:"X",
            versusSymbol: "O",
            round:1,
            versusScore: 0,
            gameId: data.gameDetails.game_id,
            creatorVersusId: `${gameCreatorId}`,
            game:['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
            whoPlayedLast:[],
            joined: [data.isOwner ? `${data.gameDetails.creator_username}` : `${data.gameDetails.player_username}`]
        } 

        const bothJoined = false
        if (gameBox.some((value) => value.creatorVersusId === gameCreatorId)) {
            const currentData = gameBox.find((value) => value.creatorVersusId === gameCreatorId)
            // The current user trying to join can be the creator  or his versus,
            // with the data.isOnwer we can know who is tring to join
            // if data.isOwner is true, is the creator, if it's false, it's its versus

            const currentUser = data.isOwner ? data.gameDetails.creator_username : data.gameDetails.player_username
            if (!currentData?.joined.some((value) => value === currentUser)) {
                currentData?.joined.push(currentUser)
            }

            someOneJoinedBefore = 1
            // Here means a user has registered before
            // if data.isOwner = true, that means the use registering now is the owner
             
        } else {
            someOneJoinedBefore = 0
            gameBox.push(gameBoxDetails)
            
        }
        return { statusNumber: someOneJoinedBefore, whoHasJoined: gameBox.filter((value) => value.creatorVersusId === gameCreatorId)[0].joined }
    }

    static FindGameToStart(creator: string, versus: string, gameId: string) {
       let error = false
        let gameData = gameBox.find((value) => value.creator === creator && value.versus === versus && value.gameId === gameId)     
        if (!gameData) {
            error = true
           return {error}
        } 

        return { gameData, error };
    }

    static playGame(isOwner:number, creator:string, versus:string, gameId:string, arrayPositionId:number, signatureSign:string ) {
      
        // find the game
        let userCurrentGame = gameBox.find((value)=> value.creator === creator && value.versus === versus && value.gameId === gameId )
        //  creator = 0
        // versus = 1
        if (userCurrentGame) {
            userCurrentGame.game[arrayPositionId] = signatureSign
            userCurrentGame.whoPlayedLast.push(signatureSign)
            let checkIfWinner = gameWinnerCheckerF(userCurrentGame.game)
            if (!checkIfWinner.canCheckWinner) {
                return {userCurrentGame, checkIfWinner}
            }
             
            // Winner of no winner at the end of  the game
            
            let neSetGame =  ["A","B","C","D","E","F","G","H","I", ]
            // if there is a winner
            if (checkIfWinner.winner !== null && checkIfWinner.winner) {
                userCurrentGame.creatorScore = isOwner === 0 ? userCurrentGame.creatorScore + 1 : userCurrentGame.creatorScore
                userCurrentGame.versusScore = isOwner === 1 ? userCurrentGame.versusScore + 1 : userCurrentGame.versusScore
                userCurrentGame.round = userCurrentGame.round + 1 

                // we changed who last played to an empty array
                userCurrentGame.whoPlayedLast = []
                // an replace game with new sets
                userCurrentGame.game = neSetGame;
               

            } else if (checkIfWinner.winner !== null && checkIfWinner.winner === false) {
              // if all the boxes have been filled, meaning nobody has won
                userCurrentGame.round = userCurrentGame.round + 1 
           
               
              // we changed who last played to an empty array
              userCurrentGame.whoPlayedLast = [];
              // an replace game with new sets
              userCurrentGame.game = neSetGame;
            }
                  // 5 -1 = 4 rounds played
            if (userCurrentGame.round  === 5) {
                PlayGameS.saveGame(userCurrentGame.creatorScore, userCurrentGame.versusScore, userCurrentGame.gameId).then((result) => {
                    return { userCurrentGame, checkIfWinner };
               })
            }
               

            return { userCurrentGame, checkIfWinner}
            
        }
    }
}


