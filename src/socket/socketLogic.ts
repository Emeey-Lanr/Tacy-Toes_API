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
}


