import { IdString } from "./types.util";

const shuffleArray = (array: any[]) => {
  let curr_i = array.length;
  let rand_i;

  while(curr_i > 0) {
    rand_i = Math.floor(Math.random() * curr_i);
    curr_i--;

    [array[curr_i], array[rand_i]] = [array[rand_i], array[curr_i]];
  }

  return array;
}

const getUniqueOpponents = (numPlayers: number) => {
  const uniqueOpponents: number[][] = Array(numPlayers);

  for (let i = 0; i <  numPlayers; i++) {
    const opp: number[] = [];
    const halfPlayers = Math.floor(numPlayers/2);
    // Add opponents from furthest to closest (if players were in a circle)
    for (let j = 0; j <= halfPlayers; j++) {
      const closest = i + halfPlayers - j;
      const otherClosest = i + halfPlayers + j;
      if (closest < numPlayers && closest !== i) {
        opp.push(closest);
      }
      if (otherClosest < numPlayers && otherClosest !== closest) {
        opp.push(otherClosest);
      }
    }
    uniqueOpponents[i] = opp;
  }

  console.info('uniqueOpponents', uniqueOpponents)

  return uniqueOpponents;
}

const getBalancedMatchupsV2 = (
  numPlayers: number,
  minMatchups: number,
): number[][] => {
  const balancedMatchups: number[][] = [];

  const remainingMatchupOpponents: number[][] = getUniqueOpponents(numPlayers);

  const playerMatchupCount: number[] = Array(numPlayers);
  playerMatchupCount.fill(0);

  const numPlayersAtMatchup: number[] = Array(minMatchups+2);
  numPlayersAtMatchup.fill(0);
  numPlayersAtMatchup[0] = numPlayers;

  let currentMinMatchups = 0;
  let tries = 0;

  while (currentMinMatchups < minMatchups && tries < 100) {
    const player = tries % numPlayers;

    const possibleOpponents = remainingMatchupOpponents[player];
    let opponentToAdd = -1;

    const playerCount = playerMatchupCount[player];
    const canAddPlayer = playerCount === currentMinMatchups || numPlayersAtMatchup[currentMinMatchups] === 1;

    if (canAddPlayer) {
      for (let i = 0; i < possibleOpponents.length; i++) {
        // if opponent has <currentMinMatchups> minMatchups, it needs a matchup. Add as opponent
        const opponent = possibleOpponents[i];
        const opponentCount = playerMatchupCount[opponent];
        const canAddOpponent = opponentCount === currentMinMatchups;
  
        if (canAddOpponent) {
          possibleOpponents.splice(i, 1);
          opponentToAdd = opponent;
          break;
        }
      }
    }

    if (opponentToAdd > -1) {
      
      const matchup = [ player, opponentToAdd ];

      matchup.forEach((_player) => {
        numPlayersAtMatchup[playerMatchupCount[_player]]--;
        playerMatchupCount[_player]++;
        numPlayersAtMatchup[playerMatchupCount[_player]]++;
      });

      balancedMatchups.push([ player, opponentToAdd ]);
    }
    

    if (numPlayersAtMatchup[currentMinMatchups] === 0) {
      currentMinMatchups++;
      tries = 0;
    }
    else {
      tries++;
    }
  }

  return balancedMatchups;
}

export const getBalancedMatchups = (
  playerIds: IdString[],
  minNumMatchupsPerPlayer: number,
  randomized: boolean = true
): IdString[][] => {

  const balancedMatchups: IdString[][] = [];
  const numUniqueMatchupsPerPlayer = playerIds.length - 1;
  let remainingNumMatchups = minNumMatchupsPerPlayer;

  while (remainingNumMatchups > 0) {
    const numMatchupsToUse = Math.min(remainingNumMatchups, numUniqueMatchupsPerPlayer);
  
    if (randomized) {
      shuffleArray(playerIds);
    }

    const indexMatchups = getBalancedMatchupsV2(playerIds.length, numMatchupsToUse);
    console.info(indexMatchups);

    indexMatchups.forEach( ([ i1, i2 ]) => {
      const playerIdMatchup = [ playerIds[i1], playerIds[i2] ];
      balancedMatchups.push(playerIdMatchup);
    });

    remainingNumMatchups -= numMatchupsToUse;
  }

  return balancedMatchups;
}
